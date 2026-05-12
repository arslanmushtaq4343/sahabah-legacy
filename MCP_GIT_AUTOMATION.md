# Git Automation MCP

This repo includes a local MCP server named `sahabah-git`.

It exposes two tools:

- `mscp`: commits and pushes current work, creates a new `work/YYYYMMDD-HHMM-name` branch, pushes it, and switches to it.
- `git_status`: shows branch, remote, latest commit, and Git identity.

Use `mscp` before changing code:

```json
{
  "name": "homepage-update"
}
```

The local MCP config is in `.mcp.json`. It is intentionally ignored by Git because it contains machine-specific paths.

You can test the underlying workflow without MCP:

```bash
npm run branch -- homepage-update
```

You can test the MCP server process:

```bash
npm run mcp:git
```

After creating a branch and editing code:

```bash
git add -A
git commit -m "Describe the change"
git push
```
