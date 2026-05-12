# Codex Repo Commands

When the user sends one of these command-like messages, treat it as an instruction even if the VS Code slash-command picker does not show it.

## Git Auto Commands

`/git_auto`, `/git-auto`, `/git_auto help`, `/git-auto help`

Show this list:

- `/version_snapshot 1.0.1` - use `git-auto` MCP tool `version_snapshot` with `version: "1.0.1"`.
- `/version_snapshot before homepage update` - use `git-auto` MCP tool `version_snapshot` with `name: "before homepage update"`.
- `/mscp homepage update` - use `git-auto` MCP tool `mscp` with `name: "homepage update"`.
- `/git_status` - use `git-auto` MCP tool `git_status`.
- `/github_auth_status` - use `git-auto` MCP tool `github_auth_status`.

`/version_snapshot <argument>`

Create a same-branch Git version snapshot through the `git-auto` MCP server.

- If `<argument>` looks like a semantic version, such as `1.0.1` or `v1.0.1`, call `version_snapshot` with `version`.
- Otherwise call `version_snapshot` with `name`.
- Do not create or switch branches.
- Commit current changes if present, push the current branch, create and push a Git tag, and stay on the same branch.

`/mscp <name>`

Use the `git-auto` MCP server tool `mscp`.

- Commit current work if present.
- Push the current branch.
- Create a new work branch.
- Push and switch to that branch.

`/git_status`

Use the `git-auto` MCP server tool `git_status`.

`/github_auth_status`

Use the `git-auto` MCP server tool `github_auth_status`.

If the `git-auto` MCP tool is not directly available in the current session, run the MCP server through:

```powershell
node "$env:USERPROFILE\.mcp\git-auto\git-auto-mcp.mjs"
```

with JSON-RPC input for the requested tool.
