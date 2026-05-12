# Branch Workflow

Use this before starting a new code change:

```bash
npm run branch -- short-change-name
```

What it does:

1. Checks your Git user name and email.
2. Adds and commits any current local changes.
3. Pushes the current branch to GitHub.
4. Creates a new branch named like `work/20260512-0515-short-change-name`.
5. Pushes that new branch to GitHub and sets it as the active branch.

After you make code changes on that branch:

```bash
git status
git add -A
git commit -m "Describe the change"
git push
```

Current Git identity:

```bash
git config user.name "arslanmushtaq4343"
git config user.email "arslanmushta4343@email.com"
```
