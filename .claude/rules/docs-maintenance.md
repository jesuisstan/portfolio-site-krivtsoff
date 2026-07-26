# Documentation Maintenance Rule

`CLAUDE.md` and `README.md` are **part of the deliverable, not afterthoughts**. Any change that makes
a statement in either file wrong must fix that statement **in the same change** — never as a follow-up
task, never "later".

The two files have different audiences and must both stay true:

- **`README.md`** — for humans arriving at the repo: what the site is, the stack, prerequisites,
  install/env setup, scripts, project structure, design system, breakpoints, deployment.
- **`CLAUDE.md`** — for Claude Code: ground rules, the self-verifying loop, commands, architecture,
  conventions, pinned dependency constraints.

## When an update is mandatory

Check both files against your diff whenever you:

| Change                                                            | Update                                                       |
| ----------------------------------------------------------------- | ------------------------------------------------------------ |
| Add, delete, rename, or move a file under `src/` or `public/`      | README "Project Structure"; CLAUDE.md "Shape" if it is a section component or a route |
| Add or remove a dependency                                        | README "Technologies Used" / "Development Tools"; CLAUDE.md if it changes the stack or is version-pinned for a reason |
| Change or pin a version for a compatibility reason                | CLAUDE.md ground rules + `.claude/agents/platform.md`; README "Prerequisites" if the Node/npm floor moves |
| Add, rename, or remove an npm script                              | README "Scripts"; CLAUDE.md "Commands"                       |
| Add, rename, or remove an env var                                 | README env block; CLAUDE.md "Environment variables"          |
| Add or remove a route, or change what a route renders             | README "Features" if user-visible; CLAUDE.md "Shape"          |
| Change the styling stack, add design tokens, retire a legacy layer | README "Design System"; CLAUDE.md "Styling"                  |
| Change breakpoints or the responsive strategy                     | README "Responsive Design"                                   |
| Change a code convention (language, export style, file layout)     | CLAUDE.md "Code conventions" + the relevant agent file        |
| Add, rename, or re-scope an agent, rule, or hook                   | CLAUDE.md; README "Working on this repo with Claude Code"     |
| Change the deployed domain or hosting setup                        | README header + Contact; CLAUDE.md "Purpose"; `metadataBase`  |

## When no update is needed

A change confined to markup, styling, copy, or logic that none of those files describe. A bug fix
inside an existing component, a class-name change, a refactor that keeps the same file names — these
touch nothing documented. Do not pad the docs with detail they never carried; a README that lists every
component's internals goes stale faster than one that describes the shape.

## How to update

- **Verify before you write.** Every factual claim (a version, a path, a script name, an env key, a
  breakpoint) must be read out of the repo, not recalled. A confidently wrong README is worse than a
  thin one.
- **Fix neighbouring lies you notice.** If you are editing the "Technologies Used" list and spot
  another stale entry in it, correct that too — you are already there.
- **Keep the two files consistent.** Where both describe the same fact (stack, env vars, commands),
  they must agree word-for-fact.
- **Preserve each file's voice.** `README.md` is public-facing and keeps its emoji section headers;
  `CLAUDE.md` is terse instruction prose. Match what is already there instead of restyling it.
- **Do not invent sections** to describe work in progress. Document what the repo does today.

## Reporting

Every agent's final report must end with one of:

- `Docs: updated <file> § <section>` — one line per section touched, or
- `Docs: no change needed` — with a half-sentence saying why (e.g. "internal refactor, no documented
  fact changed").

A silent report is treated as an incomplete task. If you believe a doc claim is wrong but fixing it is
genuinely outside your task's scope, say so explicitly rather than leaving it unmentioned.
