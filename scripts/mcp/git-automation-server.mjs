#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const serverVersion = '1.0.0';
const serverDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(serverDir, '..', '..');

const tools = [
  {
    name: 'mscp',
    description:
      'Save the current Git work, push it, create a new work branch, push that branch, and switch to it before making code changes.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'Short change name used in the branch name, for example homepage-update or fix-mobile-menu.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'git_status',
    description: 'Show the current branch, remote, latest commit, and working tree status.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
];

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    windowsHide: true,
  });

  return {
    status: result.status ?? 1,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function runGit(args) {
  return run('git', args);
}

function textResponse(text, isError = false) {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
    isError,
  };
}

function callMscp(args = {}) {
  const name = typeof args.name === 'string' && args.name.trim() ? args.name.trim() : 'change';
  const result = run(process.execPath, ['scripts/start-change-branch.mjs', name]);
  const output = `${result.stdout}${result.stderr}`.trim();

  if (result.status !== 0) {
    return textResponse(output || `mscp failed with exit code ${result.status}.`, true);
  }

  return textResponse(output || 'mscp completed.');
}

function callGitStatus() {
  const commands = [
    ['git status', runGit(['status', '--short', '--branch'])],
    ['git remote -v', runGit(['remote', '-v'])],
    ['git log -1', runGit(['log', '-1', '--oneline', '--decorate'])],
    ['git user', runGit(['config', '--get-regexp', '^user\\.(name|email)$'])],
  ];

  const output = commands
    .map(([label, result]) => {
      const body = `${result.stdout}${result.stderr}`.trim() || `(exit ${result.status})`;
      return `$ ${label}\n${body}`;
    })
    .join('\n\n');

  return textResponse(output);
}

async function handleRequest(message) {
  switch (message.method) {
    case 'initialize':
      return {
        protocolVersion: message.params?.protocolVersion || '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'sahabah-git-automation',
          version: serverVersion,
        },
      };

    case 'ping':
      return {};

    case 'tools/list':
      return { tools };

    case 'tools/call': {
      const toolName = message.params?.name;
      const args = message.params?.arguments || {};

      if (toolName === 'mscp') return callMscp(args);
      if (toolName === 'git_status') return callGitStatus();

      throw new Error(`Unknown tool: ${toolName}`);
    }

    default:
      throw new Error(`Unsupported MCP method: ${message.method}`);
  }
}

function write(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

const rl = createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on('line', async (line) => {
  if (!line.trim()) return;

  let message;
  try {
    message = JSON.parse(line);
  } catch (error) {
    write({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: `Parse error: ${error.message}`,
      },
    });
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(message, 'id')) {
    return;
  }

  try {
    const result = await handleRequest(message);
    write({
      jsonrpc: '2.0',
      id: message.id,
      result,
    });
  } catch (error) {
    write({
      jsonrpc: '2.0',
      id: message.id,
      error: {
        code: -32000,
        message: error.message,
      },
    });
  }
});
