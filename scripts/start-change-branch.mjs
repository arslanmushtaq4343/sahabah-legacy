#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

function git(args, options = {}) {
  const result = spawnSync('git', args, {
    encoding: 'utf8',
    stdio: options.inherit ? 'inherit' : ['inherit', 'pipe', 'pipe'],
  });

  if (result.status !== 0 && !options.allowFailure) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result;
}

function output(args, options = {}) {
  const result = git(args, options);
  return (result.stdout || '').trim();
}

function sanitizeBranchPart(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function timestamp() {
  const now = new Date();
  const parts = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
  ];
  return `${parts[0]}${parts[1]}${parts[2]}-${parts[3]}${parts[4]}`;
}

git(['rev-parse', '--is-inside-work-tree']);

const currentBranch = output(['branch', '--show-current']);
if (!currentBranch) {
  console.error('You must be on a named branch before creating a work branch.');
  process.exit(1);
}

const userName = output(['config', '--get', 'user.name'], { allowFailure: true });
const userEmail = output(['config', '--get', 'user.email'], { allowFailure: true });
if (!userName || !userEmail) {
  console.error('Git user name/email is missing. Set it before creating commits:');
  console.error('  git config user.name "arslanmushtaq4343"');
  console.error('  git config user.email "arslanmushta4343@email.com"');
  process.exit(1);
}

const rawSlug = process.argv.slice(2).join(' ') || 'change';
const slug = sanitizeBranchPart(rawSlug) || 'change';
const newBranch = `work/${timestamp()}-${slug}`;

console.log(`Git user: ${userName} <${userEmail}>`);
console.log(`Current branch: ${currentBranch}`);
console.log(`New branch: ${newBranch}`);

git(['fetch', 'origin'], { inherit: true });
git(['add', '-A'], { inherit: true });

const stagedDiff = git(['diff', '--cached', '--quiet'], { allowFailure: true });
if (stagedDiff.status !== 0) {
  git(['commit', '-m', `Save work before ${newBranch}`], { inherit: true });
} else {
  console.log('No local changes to commit before branching.');
}

const upstream = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}'], {
  allowFailure: true,
});
if (upstream.status === 0) {
  git(['push'], { inherit: true });
} else {
  git(['push', '-u', 'origin', currentBranch], { inherit: true });
}

const localExists = git(['rev-parse', '--verify', '--quiet', newBranch], { allowFailure: true });
if (localExists.status === 0) {
  console.error(`Local branch already exists: ${newBranch}`);
  process.exit(1);
}

const remoteExists = git(['ls-remote', '--exit-code', '--heads', 'origin', newBranch], {
  allowFailure: true,
});
if (remoteExists.status === 0) {
  console.error(`Remote branch already exists: ${newBranch}`);
  process.exit(1);
}

git(['switch', '-c', newBranch], { inherit: true });
git(['push', '-u', 'origin', newBranch], { inherit: true });

console.log('');
console.log(`Ready for changes on ${newBranch}.`);
console.log('After editing, use: git add -A && git commit -m "Your message" && git push');
