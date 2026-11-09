---
name: task
description: Run a site change end to end — restate it, branch off main, write observable acceptance criteria, delegate to frontend/platform, verify in the browser with the verifier, sync the four root documents, report. Use for any change a visitor would see or that alters the site's behaviour.
argument-hint: <what should change, in your own words>
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git switch:*), Bash(git log:*), Bash(git diff:*), Bash(npm run *), Bash(curl:*)
---

## Context

- Task: `$ARGUMENTS`
- Branch: !`git branch --show-current`
- Working tree: !`git status --short`
- Dev server (HTTP code, 000 = down): !`curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://localhost:3000 || true`

## Task

Run the stated task through `CLAUDE.md` § Self-verifying loop. Invoking this skill is the request to
delegate (`.claude/rules/agent-delegation.md`). It does not authorize a commit or a push — those wait for
the user's word (`.claude/rules/git-workflow.md`).

1. **Understand.** Restate the task in one or two sentences, with any assumption.
   - No statement → ask for one.
   - Two readings that lead to materially different work → one focused question. Read what the repo
     can answer instead of asking.
   - A redesign or an open visual direction → load the `impeccable` skill first and settle the
     direction with the user before writing criteria. The direction must change the composition, not
     only the decoration.
   - Visible copy is the owner's: propose wording, never invent it.
2. **Branch.** On `main` with edits ahead: `git switch -c <kebab-slug>` before touching anything; the
   slug names the change. Stop and ask if the tree holds changes you cannot attribute or HEAD is
   detached. On a task branch already → stay.
3. **Criteria** before code.
   - Write observable outcomes a browser can check, each naming the width, locale and theme it applies
     to. The verifier's standing checks — both locales, both themes, 360/768/1280, reduced motion,
     console — run regardless.
   - Write the criteria and every decision taken into a brief file in the scratchpad.
   - A defect that is cheap to reproduce: reproduce it first.
4. **Dev server.** Code 000 → start `npm run dev` in the background and wait until it answers. Never run
   `npm run build` while it is up.
5. **Build** through `frontend` / `platform` per the routing table, passing the brief's path. Send
   corrections and follow-ups to the same agent with `SendMessage`.
6. **Verify** with `verifier`, the criteria verbatim.
   - On FAIL, its `FIX_HINTS` go back to the builder.
   - At most 3 rounds; still failing → stop and report honestly.
   - Before it starts, clear any emulation you set in the shared browser.
7. **Checks:** `npm run typecheck`, `npm run lint`, plus `npm run design:check` when tokens or
   `DESIGN.md` moved.
8. **Docs.** Hold the change against README, `CLAUDE.md`, `DESIGN.md` and `PRODUCT.md`. Fix what it made
   false in the owning file only (`.claude/rules/docs-maintenance.md`). A builder's
   `Docs: no change needed` does not replace this check.
9. **Report**:
   - files changed;
   - the verifier's verdict with its evidence and limits;
   - what needs the user's decision;
   - then offer to commit and push.
