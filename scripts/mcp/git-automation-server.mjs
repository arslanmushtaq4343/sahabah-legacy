#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import path from 'node:path';

const serverVersion = '2.0.0';
const defaultRepoPath = process.env.GIT_AUTO_DEFAULT_REPO || process.cwd();

const defaultGitignore = [
  'node_modules/',
  '.env',
  '.env.*',
  '.DS_Store',
  'Thumbs.db',
  'tmp/',
  '.cache/',
  '',
].join('\n');

const tools = [
  {
    name: 'mscp',
    description:
      'Generic Git automation: detect/init repo, optionally create GitHub repo, commit and push current work, then create and push a new work branch.',
    inputSchema: {
      type: 'object',
      properties: {
        repoPath: {
          type: 'string',
          description: 'Project folder. Defaults to GIT_AUTO_DEFAULT_REPO or the MCP process working directory.',
        },
        name: {
          type: 'string',
          description: 'Short change name used in the new branch name, for example homepage-update.',
        },
        branchPrefix: {
          type: 'string',
          description: 'Prefix for new branches. Defaults to work.',
        },
        commitMessage: {
          type: 'string',
          description: 'Commit message for saving current work before branching.',
        },
        remoteUrl: {
          type: 'string',
          description: 'Optional Git remote URL to use when origin is missing.',
        },
        repoName: {
          type: 'string',
          description: 'GitHub repo name to create when origin is missing. Defaults to folder name.',
        },
        githubOwner: {
          type: 'string',
          description: 'GitHub user/org for repo creation. Defaults to authenticated user when using token.',
        },
        visibility: {
          type: 'string',
          enum: ['private', 'public'],
          description: 'Visibility for newly created GitHub repos. Defaults to private.',
        },
        userName: {
          type: 'string',
          description: 'Optional local Git user.name to set if missing.',
        },
        userEmail: {
          type: 'string',
          description: 'Optional local Git user.email to set if missing.',
        },
        writeDefaultGitignore: {
          type: 'boolean',
          description: 'Create a safe starter .gitignore when the folder has none. Defaults to true.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'git_status',
    description: 'Show Git status for any project folder.',
    inputSchema: {
      type: 'object',
      properties: {
        repoPath: {
          type: 'string',
          description: 'Project folder. Defaults to GIT_AUTO_DEFAULT_REPO or the MCP process working directory.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'version_snapshot',
    description:
      'Same-branch versioning: detect/init repo, optionally create GitHub repo, commit and push current work, create and push a Git tag, and stay on the current branch.',
    inputSchema: {
      type: 'object',
      properties: {
        repoPath: {
          type: 'string',
          description: 'Project folder. Defaults to GIT_AUTO_DEFAULT_REPO or the MCP process working directory.',
        },
        name: {
          type: 'string',
          description: 'Short snapshot name used when tagName/version is not provided.',
        },
        version: {
          type: 'string',
          description: 'Optional semantic version. Example: 1.0.1 creates tag v1.0.1.',
        },
        tagName: {
          type: 'string',
          description: 'Exact Git tag to create. Example: v1.0.1 or release/mobile-fix.',
        },
        tagPrefix: {
          type: 'string',
          description: 'Prefix for automatic tags. Defaults to version.',
        },
        commitMessage: {
          type: 'string',
          description: 'Commit message for saving current work before tagging.',
        },
        tagMessage: {
          type: 'string',
          description: 'Annotated Git tag message.',
        },
        remoteUrl: {
          type: 'string',
          description: 'Optional Git remote URL to use when origin is missing.',
        },
        repoName: {
          type: 'string',
          description: 'GitHub repo name to create when origin is missing. Defaults to folder name.',
        },
        githubOwner: {
          type: 'string',
          description: 'GitHub user/org for repo creation. Defaults to authenticated user when using token.',
        },
        visibility: {
          type: 'string',
          enum: ['private', 'public'],
          description: 'Visibility for newly created GitHub repos. Defaults to private.',
        },
        userName: {
          type: 'string',
          description: 'Optional local Git user.name to set if missing.',
        },
        userEmail: {
          type: 'string',
          description: 'Optional local Git user.email to set if missing.',
        },
        writeDefaultGitignore: {
          type: 'boolean',
          description: 'Create a safe starter .gitignore when the folder has none. Defaults to true.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'github_auth_status',
    description: 'Show whether GitHub repo creation can use gh CLI or GH_TOKEN/GITHUB_TOKEN.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
];

function resolveRepoPath(repoPath) {
  return path.resolve(repoPath || defaultRepoPath);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    windowsHide: true,
  });

  return {
    status: result.status ?? 1,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function runChecked(command, args, options = {}) {
  const result = run(command, args, options);
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed:\n${result.stdout}${result.stderr}`.trim());
  }
  return result;
}

function git(repoPath, args) {
  return run('git', args, { cwd: repoPath });
}

function gitChecked(repoPath, args) {
  return runChecked('git', args, { cwd: repoPath });
}

function gitOutput(repoPath, args) {
  return gitChecked(repoPath, args).stdout.trim();
}

function commandExists(command) {
  const probe = process.platform === 'win32'
    ? run('where.exe', [command])
    : run('sh', ['-lc', `command -v ${command}`]);
  return probe.status === 0;
}

function sanitizePart(value, fallback) {
  const clean = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return clean || fallback;
}

function timestamp() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    '-',
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
  ].join('');
}

function versionTimestamp() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    '-',
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('');
}

function textResponse(text, isError = false) {
  return {
    content: [{ type: 'text', text }],
    isError,
  };
}

function hasGitRepo(repoPath) {
  return git(repoPath, ['rev-parse', '--is-inside-work-tree']).status === 0;
}

function hasCommit(repoPath) {
  return git(repoPath, ['rev-parse', '--verify', 'HEAD']).status === 0;
}

function ensureRepoFolder(repoPath) {
  if (!existsSync(repoPath)) {
    throw new Error(`Project folder does not exist: ${repoPath}`);
  }
}

function ensureGitRepo(repoPath) {
  if (hasGitRepo(repoPath)) return 'Existing Git repo detected.';
  gitChecked(repoPath, ['init', '-b', 'main']);
  return 'Initialized new Git repo on main.';
}

function ensureDefaultGitignore(repoPath, enabled) {
  if (enabled === false) return null;
  const gitignorePath = path.join(repoPath, '.gitignore');
  if (existsSync(gitignorePath)) return null;
  writeFileSync(gitignorePath, defaultGitignore, 'utf8');
  return 'Created starter .gitignore.';
}

function ensureGitIdentity(repoPath, args) {
  let name = git(repoPath, ['config', '--get', 'user.name']).stdout.trim();
  let email = git(repoPath, ['config', '--get', 'user.email']).stdout.trim();

  if (!name && args.userName) {
    gitChecked(repoPath, ['config', 'user.name', args.userName]);
    name = args.userName;
  }

  if (!email && args.userEmail) {
    gitChecked(repoPath, ['config', 'user.email', args.userEmail]);
    email = args.userEmail;
  }

  if (!name || !email) {
    throw new Error(
      [
        'Git user name/email is missing.',
        'Set it globally or pass userName/userEmail to mscp:',
        '  git config --global user.name "Your GitHub username"',
        '  git config --global user.email "you@example.com"',
      ].join('\n'),
    );
  }

  return `Git user: ${name} <${email}>`;
}

function getCurrentBranch(repoPath) {
  const branch = git(repoPath, ['branch', '--show-current']).stdout.trim();
  return branch || 'main';
}

function getOriginUrl(repoPath) {
  const result = git(repoPath, ['remote', 'get-url', 'origin']);
  return result.status === 0 ? result.stdout.trim() : '';
}

async function githubFetch(url, options = {}) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) return null;

  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let body = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }

  return { response, body };
}

async function createGitHubRepoWithToken({ repoName, owner, visibility }) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) return null;

  const userResult = await githubFetch('https://api.github.com/user');
  if (!userResult?.response.ok) {
    const message = userResult?.body?.message || 'GitHub token auth failed.';
    throw new Error(`Could not read authenticated GitHub user: ${message}`);
  }

  const login = userResult.body.login;
  const targetOwner = owner || login;
  const isUserRepo = targetOwner.toLowerCase() === login.toLowerCase();
  const endpoint = isUserRepo
    ? 'https://api.github.com/user/repos'
    : `https://api.github.com/orgs/${encodeURIComponent(targetOwner)}/repos`;

  const createResult = await githubFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      name: repoName,
      private: visibility !== 'public',
      auto_init: false,
    }),
  });

  if (createResult.response.status === 422) {
    return {
      remoteUrl: `https://github.com/${targetOwner}/${repoName}.git`,
      note: `GitHub repo may already exist: ${targetOwner}/${repoName}`,
    };
  }

  if (!createResult.response.ok) {
    const message = createResult.body?.message || `HTTP ${createResult.response.status}`;
    throw new Error(`Could not create GitHub repo: ${message}`);
  }

  return {
    remoteUrl: createResult.body.clone_url,
    note: `Created GitHub repo: ${createResult.body.full_name}`,
  };
}

function createGitHubRepoWithGh(repoPath, { repoName, owner, visibility }) {
  if (!commandExists('gh')) return null;

  const fullName = owner ? `${owner}/${repoName}` : repoName;
  const visibilityFlag = visibility === 'public' ? '--public' : '--private';
  const result = run('gh', ['repo', 'create', fullName, visibilityFlag, '--source', repoPath, '--remote', 'origin'], {
    cwd: repoPath,
  });

  if (result.status !== 0 && !/already exists/i.test(`${result.stdout}${result.stderr}`)) {
    throw new Error(`gh repo create failed:\n${result.stdout}${result.stderr}`.trim());
  }

  const remoteUrl = getOriginUrl(repoPath) || `https://github.com/${fullName}.git`;
  return {
    remoteUrl,
    note: result.status === 0 ? `Created GitHub repo: ${fullName}` : `GitHub repo may already exist: ${fullName}`,
  };
}

async function ensureOrigin(repoPath, args) {
  const existing = getOriginUrl(repoPath);
  if (existing) return `Using existing origin: ${existing}`;

  if (args.remoteUrl) {
    gitChecked(repoPath, ['remote', 'add', 'origin', args.remoteUrl]);
    return `Added origin: ${args.remoteUrl}`;
  }

  const repoName = sanitizePart(args.repoName || path.basename(repoPath), 'new-repo');
  const owner = args.githubOwner ? sanitizePart(args.githubOwner, '') : '';
  const visibility = args.visibility === 'public' ? 'public' : 'private';

  const ghResult = createGitHubRepoWithGh(repoPath, { repoName, owner, visibility });
  if (ghResult) {
    if (!getOriginUrl(repoPath)) gitChecked(repoPath, ['remote', 'add', 'origin', ghResult.remoteUrl]);
    return ghResult.note;
  }

  const tokenResult = await createGitHubRepoWithToken({ repoName, owner, visibility });
  if (tokenResult) {
    gitChecked(repoPath, ['remote', 'add', 'origin', tokenResult.remoteUrl]);
    return tokenResult.note;
  }

  throw new Error(
    [
      'No origin remote is configured, and I cannot create a GitHub repo automatically yet.',
      'Use one of these options:',
      '  1. Install/login GitHub CLI: gh auth login',
      '  2. Set GITHUB_TOKEN or GH_TOKEN with repo creation permission',
      '  3. Pass remoteUrl to mscp for an already-created GitHub repo',
    ].join('\n'),
  );
}

function stageAndCommit(repoPath, message) {
  gitChecked(repoPath, ['add', '-A']);

  const noStagedChanges = git(repoPath, ['diff', '--cached', '--quiet']).status === 0;
  if (!hasCommit(repoPath) && noStagedChanges) {
    gitChecked(repoPath, ['commit', '--allow-empty', '-m', message || 'Initial commit']);
    return 'Created empty initial commit.';
  }

  if (noStagedChanges) {
    return 'No local changes to commit before branching.';
  }

  gitChecked(repoPath, ['commit', '-m', message]);
  return `Committed current work: ${message}`;
}

function pushCurrentBranch(repoPath, branch) {
  const upstream = git(repoPath, ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
  if (upstream.status === 0) {
    gitChecked(repoPath, ['push']);
    return `Pushed ${branch} to ${upstream.stdout.trim()}.`;
  }

  gitChecked(repoPath, ['push', '-u', 'origin', branch]);
  return `Pushed ${branch} to origin/${branch}.`;
}

function createAndPushBranch(repoPath, branchName) {
  if (git(repoPath, ['rev-parse', '--verify', '--quiet', branchName]).status === 0) {
    throw new Error(`Local branch already exists: ${branchName}`);
  }

  if (git(repoPath, ['ls-remote', '--exit-code', '--heads', 'origin', branchName]).status === 0) {
    throw new Error(`Remote branch already exists: ${branchName}`);
  }

  gitChecked(repoPath, ['switch', '-c', branchName]);
  gitChecked(repoPath, ['push', '-u', 'origin', branchName]);
  return `Created and pushed new branch: ${branchName}`;
}

function resolveTagName(args = {}) {
  if (typeof args.tagName === 'string' && args.tagName.trim()) {
    return args.tagName.trim();
  }

  if (typeof args.version === 'string' && args.version.trim()) {
    const version = args.version.trim().replace(/^v/i, '');
    return `v${version}`;
  }

  const tagPrefix = sanitizePart(args.tagPrefix || 'version', 'version');
  const slug = sanitizePart(args.name || 'snapshot', 'snapshot');
  return `${tagPrefix}/${versionTimestamp()}-${slug}`;
}

function createAndPushTag(repoPath, tagName, message) {
  if (git(repoPath, ['rev-parse', '--verify', '--quiet', `refs/tags/${tagName}`]).status === 0) {
    throw new Error(`Local tag already exists: ${tagName}`);
  }

  if (git(repoPath, ['ls-remote', '--exit-code', '--tags', 'origin', `refs/tags/${tagName}`]).status === 0) {
    throw new Error(`Remote tag already exists: ${tagName}`);
  }

  gitChecked(repoPath, ['tag', '-a', tagName, '-m', message]);
  gitChecked(repoPath, ['push', 'origin', `refs/tags/${tagName}`]);
  return `Created and pushed tag: ${tagName}`;
}

async function callMscp(args = {}) {
  const repoPath = resolveRepoPath(args.repoPath);
  const branchPrefix = sanitizePart(args.branchPrefix || 'work', 'work');
  const slug = sanitizePart(args.name || 'change', 'change');
  const newBranch = `${branchPrefix}/${timestamp()}-${slug}`;
  const messages = [`Repo: ${repoPath}`];

  ensureRepoFolder(repoPath);
  messages.push(ensureGitRepo(repoPath));

  const gitignoreMessage = ensureDefaultGitignore(repoPath, args.writeDefaultGitignore);
  if (gitignoreMessage) messages.push(gitignoreMessage);

  messages.push(ensureGitIdentity(repoPath, args));
  messages.push(await ensureOrigin(repoPath, args));

  const fetchResult = git(repoPath, ['fetch', 'origin']);
  if (fetchResult.status === 0) {
    messages.push('Fetched origin.');
  } else {
    messages.push(`Fetch skipped or failed: ${fetchResult.stderr.trim() || fetchResult.stdout.trim()}`);
  }

  const currentBranch = getCurrentBranch(repoPath);
  const commitMessage = args.commitMessage || `Save work before ${newBranch}`;
  messages.push(stageAndCommit(repoPath, commitMessage));
  messages.push(pushCurrentBranch(repoPath, currentBranch));
  messages.push(createAndPushBranch(repoPath, newBranch));
  messages.push('');
  messages.push(`Ready for changes on ${newBranch}.`);
  messages.push('After editing: git add -A && git commit -m "Describe the change" && git push');

  return textResponse(messages.join('\n'));
}

async function callVersionSnapshot(args = {}) {
  const repoPath = resolveRepoPath(args.repoPath);
  const tagName = resolveTagName(args);
  const messages = [`Repo: ${repoPath}`];

  ensureRepoFolder(repoPath);
  messages.push(ensureGitRepo(repoPath));

  const gitignoreMessage = ensureDefaultGitignore(repoPath, args.writeDefaultGitignore);
  if (gitignoreMessage) messages.push(gitignoreMessage);

  messages.push(ensureGitIdentity(repoPath, args));
  messages.push(await ensureOrigin(repoPath, args));

  const fetchResult = git(repoPath, ['fetch', 'origin', '--tags']);
  if (fetchResult.status === 0) {
    messages.push('Fetched origin and tags.');
  } else {
    messages.push(`Fetch skipped or failed: ${fetchResult.stderr.trim() || fetchResult.stdout.trim()}`);
  }

  const currentBranch = getCurrentBranch(repoPath);
  const commitMessage = args.commitMessage || `Version snapshot ${tagName}`;
  const tagMessage = args.tagMessage || commitMessage;
  messages.push(stageAndCommit(repoPath, commitMessage));
  messages.push(pushCurrentBranch(repoPath, currentBranch));
  messages.push(createAndPushTag(repoPath, tagName, tagMessage));
  messages.push('');
  messages.push(`Version saved as ${tagName}.`);
  messages.push(`Stayed on branch: ${currentBranch}.`);

  return textResponse(messages.join('\n'));
}

function callGitStatus(args = {}) {
  const repoPath = resolveRepoPath(args.repoPath);
  if (!existsSync(repoPath)) {
    return textResponse(`Project folder does not exist: ${repoPath}`, true);
  }

  const commands = hasGitRepo(repoPath)
    ? [
        ['git status', ['status', '--short', '--branch']],
        ['git remote -v', ['remote', '-v']],
        ['git log -1', ['log', '-1', '--oneline', '--decorate']],
        ['git user', ['config', '--get-regexp', '^user\\.(name|email)$']],
      ]
    : [];

  if (!commands.length) {
    return textResponse(`Repo: ${repoPath}\nNo Git repo detected.`);
  }

  const output = commands
    .map(([label, argsForGit]) => {
      const result = git(repoPath, argsForGit);
      const body = `${result.stdout}${result.stderr}`.trim() || `(exit ${result.status})`;
      return `$ ${label}\n${body}`;
    })
    .join('\n\n');

  return textResponse(`Repo: ${repoPath}\n\n${output}`);
}

function callGithubAuthStatus() {
  const gh = commandExists('gh');
  const token = Boolean(process.env.GITHUB_TOKEN || process.env.GH_TOKEN);
  const lines = [
    `gh CLI available: ${gh ? 'yes' : 'no'}`,
    `GITHUB_TOKEN/GH_TOKEN available: ${token ? 'yes' : 'no'}`,
  ];

  if (!gh && !token) {
    lines.push('');
    lines.push('Automatic GitHub repo creation needs one of these:');
    lines.push('  gh auth login');
    lines.push('  set GITHUB_TOKEN or GH_TOKEN');
  }

  return textResponse(lines.join('\n'));
}

async function handleRequest(message) {
  switch (message.method) {
    case 'initialize':
      return {
        protocolVersion: message.params?.protocolVersion || '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: {
          name: 'generic-git-automation',
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
      if (toolName === 'git_status') return callGitStatus(args);
      if (toolName === 'version_snapshot') return callVersionSnapshot(args);
      if (toolName === 'github_auth_status') return callGithubAuthStatus();

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

  if (!Object.prototype.hasOwnProperty.call(message, 'id')) return;

  try {
    const result = await handleRequest(message);
    write({ jsonrpc: '2.0', id: message.id, result });
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
