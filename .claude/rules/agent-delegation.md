# Agent Delegation Rule

This project defines specialized subagents in `.claude/agents/` (`frontend`, `platform`, `verifier`).
Default to delegating implementation work to them via the Agent tool instead of editing files
directly in the main conversation.

`frontend`/`platform` **build**; `verifier` **checks** the running site in a browser (chrome-devtools
MCP) and never edits code. After any UI/behavior change, delegate to `verifier` and loop
build → verify → correct until it returns `PASS` — see the "Self-verifying loop" section in
`CLAUDE.md` for the full protocol (acceptance criteria, dev-server prerequisite, 3-iteration cap).

## When to delegate

- The task is to add, change, or build code that clearly falls in one agent's domain (see its
  `description` in `.claude/agents/*.md`): UI components, sections, styling, layout, motion, design
  tokens → `frontend`; app structure, metadata/SEO, config, tooling, the TypeScript migration,
  dependencies, page data modules, performance → `platform`.
- The task spans multiple files, or is a new section/feature rather than a small point-fix.
- The task clearly spans both domains: delegate to both (in parallel when independent, sequentially
  when one depends on the other's output).

## When not to delegate

- A trivial one-line fix (typo, single value change, renaming one identifier) — handle it directly;
  spinning up a subagent adds latency/cost with no benefit.
- Pure investigation/reading (answering "where is X" or "why does Y happen") — use `Explore` or read
  the files directly; delegate only when the answer requires writing code.

## Why

The user maintains `frontend.md`/`platform.md` with project-specific conventions (design tokens, the
anti-template design direction, file structure, code rules, migration policy) that are easy to drift
from when editing ad hoc in the main conversation. Delegating keeps changes consistent with those conventions and keeps context-7
documentation lookups (see [[documentation-lookup]]) scoped to the agent that actually needs them.
