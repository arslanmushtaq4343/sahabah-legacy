# Generic Git Automation MCP

This MCP is generic. It is not tied to this repo.

Server name in local MCP config:

```text
git-auto
```

Main tool:

```text
mscp
```

What `mscp` does:

1. Checks whether the target folder is already a Git repo.
2. If not, runs `git init -b main`.
3. Creates a starter `.gitignore` only when the folder has none.
4. Checks Git user name and email.
5. Checks whether `origin` exists.
6. If `origin` exists, commits and pushes current work.
7. If `origin` does not exist, it can create a GitHub repo with `gh` or `GITHUB_TOKEN`/`GH_TOKEN`, or use a supplied `remoteUrl`.
8. Creates a new branch like `work/20260512-1820-homepage-update`.
9. Pushes that new branch and switches to it.

Same-branch versioning tool:

```text
version_snapshot
```

What `version_snapshot` does:

1. Checks/initializes Git just like `mscp`.
2. Commits current work if anything changed.
3. Pushes the current branch.
4. Creates an annotated Git tag.
5. Pushes the tag.
6. Leaves you on the same branch.

Use it with the current default repo:

```json
{
  "name": "homepage-update"
}
```

Use it for any other project:

```json
{
  "repoPath": "D:\\Tools_Updated\\another-project",
  "name": "navbar-fix"
}
```

Create a version tag without changing branch:

```json
{
  "repoPath": "D:\\Tools_Updated\\another-project",
  "name": "before-homepage-update"
}
```

Create a specific semantic version tag:

```json
{
  "repoPath": "D:\\Tools_Updated\\another-project",
  "version": "1.0.1"
}
```

Use it for a folder with no Git remote yet, when you already created the GitHub repo:

```json
{
  "repoPath": "D:\\Tools_Updated\\another-project",
  "name": "first-work-branch",
  "remoteUrl": "https://github.com/arslanmushtaq4343/another-project.git"
}
```

For full end-to-end GitHub repo creation, provide one of these:

```bash
gh auth login
```

or:

```bash
set GITHUB_TOKEN=your_token_here
```

Then call:

```json
{
  "repoPath": "D:\\Tools_Updated\\new-project",
  "name": "initial-work",
  "repoName": "new-project",
  "githubOwner": "arslanmushtaq4343",
  "visibility": "private"
}
```

Other tools:

```text
git_status
github_auth_status
version_snapshot
```

The user-level MCP script is here:

```text
C:\Users\arslan.ali\.mcp\git-auto\git-auto-mcp.mjs
```

The tracked copy is here:

```text
scripts/mcp/git-automation-server.mjs
```
