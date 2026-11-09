# Delegation and orchestration

Implementation that spans several files goes to the subagents in `.claude/agents/`, routed by each one's
`description`, so the main conversation keeps conclusions, not file dumps. An explicit instruction from
the user wins. The build → verify loop itself is `CLAUDE.md` § Self-verifying loop; this file is how to
run the agents inside it.

| Task touches | Agent |
| --- | --- |
| What a visitor sees: section components, `src/components/ui/`, tokens in `globals.css`, layout, themes, motion, the copy keys a component reads | `frontend` |
| Everything around the components: `src/app/**` structure and metadata, `src/i18n/` routing, `src/proxy.ts`, `src/constants/**`, config (`next.config.ts`, `tsconfig.json`, ESLint, PostCSS), dependencies, `public/` assets, `scripts/`, performance | `platform` |
| Whether a change works and looks right in the browser | `verifier` |

Both domains → both agents: in parallel when independent, sequentially when one needs the other's
output. Do it yourself for a point fix (one value, a typo, a rename, commenting out an entry); a lookup
is `Read`/`Grep`, or `Explore` when it sweeps many files.

## Briefing

A subagent knows only its prompt, `CLAUDE.md`, the rules and its own file — not this conversation.

- Give the goal, the acceptance criteria verbatim, the files involved and what is out of scope.
- Pass every decision already made with the user (direction, copy, what stays untouched): the agent
  cannot ask the user, and a guess at a settled question is wasted work.
- State the constraints that bite in this task, e.g. "the dev server is live — no `npm run build`".
- Say what to return: files changed, each criterion → how it is met, measurements, the `Docs:` lines.
- A long brief goes into a file in the scratchpad and the prompt passes its path; the verifier and any
  reviewer then judge against the same text.

## Running agents

- **Continue, don't respawn.** A follow-up or correction goes to the same agent with `SendMessage`, which
  keeps its context; a new agent starts from zero.
- **One writer per file.** While an agent edits, leave its files alone and queue your change to it. A
  change that lands during a verification: message the verifier to reload and mark the affected checks
  `deferred`, then re-check them in a focused pass.
- **A report is a claim.** Check `git status` / `git diff --stat` before relaying it. An interrupted agent
  (rate limit, cancellation) may have landed nothing: look at the tree before resuming it.
- **The owner edits the same tree in parallel.** Changes nobody delegated are theirs: never revert or
  "fix" them; mention them, and update a doc they made false.
- Background agents notify on completion: don't poll their output.

## The shared browser

The chrome-devtools MCP drives one Chrome for the whole session; the selected page, emulation (viewport,
colour scheme, reduced motion) and cookies persist from one caller to the next.

- The `verifier` drives it; the main conversation only when no agent is using it.
- Builders check their own work in a separate headless Chrome (`google-chrome --headless=new
  --remote-debugging-port=<free port> --user-data-dir=$(mktemp -d)`, driven over CDP from Node's built-in
  `fetch`/`WebSocket`), never in the shared one.
- Whoever sets an emulation clears it (`emulate` with no options) before handing over. A leftover
  viewport emulation silently locks `resize_page` for the next caller.
