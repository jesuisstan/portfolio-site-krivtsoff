# Git workflow

- `origin` is GitHub (`jesuisstan/portfolio-site-krivtsoff`); `main` deploys to Vercel and never takes a
  direct commit.
- Commit or push only when the user asks. Work on a task branch off `main` with a short kebab-case name
  for the change (`hero-redesign`).
- The owner edits and commits in the same working tree while agents run. Put `git branch --show-current`
  in the same command as every commit and push, and stop if it prints `main`. Stage explicit paths; use
  `git add -A` only when asked to commit everything, and then say which of the owner's own edits went in.
- One-line imperative English subject, a short body only when it helps. Unrelated changes — a tooling
  update and a feature — go into separate commits when the files allow it.
- Never commit generated or machine-specific artifacts: `.next/`, `.env*`, platform binaries such as the
  Impeccable engine under `.claude/skills/impeccable/scripts/bin/`.
- Push an explicit branch: `git push -u origin <branch>`. If it fails on authentication (the HTTPS
  remote has no credential helper in this WSL environment and its SSH key is not registered with
  GitHub), hand the user the exact command — `! git push -u origin <branch>` — instead of working around
  it.
- Never force-push or rewrite published history. Opening a pull request is the user's step (no `gh` CLI
  here).
