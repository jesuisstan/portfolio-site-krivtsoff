# Documentation Maintenance Rule

The four root documents are **part of the deliverable, not afterthoughts**. Any change that makes a
statement in one of them wrong must fix that statement **in the same change** — never as a follow-up,
never "later".

## One fact, one file

Every documented fact has exactly **one** owning file. Every other file that needs it **links to the
owner instead of repeating it**. A fact written in two places is a bug: the copies drift, and a
confidently wrong document is worse than a thin one.

| File | Owns | Never contains |
| ---- | ---- | -------------- |
| **`README.md`** | The newcomer's entry point: what the site is and who it's for, the stack list, prerequisites, install and env setup, the scripts table, the project file tree, deployment. | The design system. No token values, no colour roles, no type scale, no breakpoint table, no motion catalogue, no visual do's and don'ts. One line pointing at `DESIGN.md` is the whole coverage. |
| **`CLAUDE.md`** | Operating instructions for Claude Code: ground rules, the self-verifying loop, the command list, the architecture "Shape", code conventions, dependency pins and the reasons for them, which mechanical constraints break the build if violated. | Visual doctrine (that is `DESIGN.md`) and audience/positioning claims (that is `PRODUCT.md`). It may state a *mechanical* styling constraint — where tokens live, which utility namespace is required — but not which colour is tasteful where. |
| **`DESIGN.md`** | The whole visual system, and the only prose place design decisions are recorded: colour roles, typography, layout and responsive behaviour, elevation, shapes, per-component specs, named rules, do's and don'ts. Its YAML frontmatter is generated — see below. | Product truth, build tooling, install steps, code conventions unrelated to appearance. |
| **`PRODUCT.md`** | Durable product truth: users and their situation, purpose, positioning, operating context, capabilities and constraints, brand commitments, evidence on hand and its documented absences, accessibility requirements. | Visual worlds, palettes, page composition, or anything a redesign would legitimately change. |
| **`.claude/agents/*.md`** | How that one agent works: its domain, its tools and the order it uses them, install/reconcile procedures, its own report format. | A copy of the design system, the product record, or the code conventions. Point at the owner. |
| **`.claude/rules/*.md`** | Cross-cutting conventions that apply to every agent and to the main conversation: code quality, code organisation, communication, delegation, documentation lookup, and this ownership model. | Anything specific to one agent's workflow, and anything the four root documents own. |

One redundancy is deliberate: a constraint that **silently breaks the build or the theme** may be stated
in both its owning rule file and `CLAUDE.md`, because `CLAUDE.md` is always in context and a rule file may
not be. Keep those restatements short, mechanical, and value-free — a pointer plus the constraint, never a
second copy of the reasoning. Everything else follows one-fact-one-file.

Values are owned by **code**, not prose. Token values live in `src/styles/globals.css` and reach
`DESIGN.md` only through `npm run design:sync`, which regenerates the frontmatter and
`.impeccable/design.json`. **No prose file — not `README.md`, not `CLAUDE.md`, not an agent file —
quotes a hex or `oklch()` value.** Name the token (`--primary`, `shadow-ambient`) and let the reader
resolve it. The two exceptions are `DESIGN.md`'s own Colors and Elevation sections, where an exact value
in parentheses is the documented format, and a value cited as the *reason* for a decision (a measured
contrast ratio, a value that failed a threshold).

## When an update is mandatory

Check your diff against the owning file only.

| Change | Update |
| ------ | ------ |
| Add, delete, rename, or move a file under `src/` or `public/` | README "Project Structure"; CLAUDE.md "Shape" if it is a section component or a route |
| Add or remove a dependency | README "Technologies Used" / "Development Tools"; CLAUDE.md only if it changes the stack or is version-pinned for a reason |
| Change or pin a version for a compatibility reason | CLAUDE.md ground rules + `.claude/agents/platform.md`; README "Prerequisites" if the Node/npm floor moves |
| Add, rename, or remove an npm script | README "Scripts"; CLAUDE.md "Commands" |
| Add, rename, or remove an env var | README env block; CLAUDE.md "Environment variables" |
| Add or remove a route, or change what a route renders | README "Features" if user-visible; CLAUDE.md "Shape" |
| **Add or change a design token** | `src/styles/globals.css`, then run `npm run design:sync`. Describe its role in DESIGN.md prose. README and CLAUDE.md get nothing unless a *mechanical* rule changed |
| **Change colour, typography, spacing, elevation, motion, or a component's look** | DESIGN.md only |
| **Change breakpoints or the responsive strategy** | DESIGN.md "Layout" only |
| **Change who the site is for, what it claims, or which facts are protected** | PRODUCT.md only |
| Change a code convention (language, export style, file layout) | CLAUDE.md "Code conventions" + the relevant agent file |
| Add, rename, or re-scope an agent, rule, hook, or skill | CLAUDE.md; README "Working on this repo with Claude Code" |
| Change the deployed domain or hosting setup | README header + Contact; CLAUDE.md "Purpose"; `metadataBase` |

## When no update is needed

A change confined to markup, styling, copy, or logic that none of those files describes. A bug fix
inside an existing component, a class-name change, a refactor that keeps the same file names — these
touch nothing documented. Do not pad the docs with detail they never carried.

## How to update

- **Verify before you write.** Every factual claim (a version, a path, a script name, an env key, a
  token name) must be read out of the repo, not recalled.
- **Delete a duplicate rather than syncing it.** If you find the same fact in two files, keep it in the
  owner and replace the copy with a pointer. That counts as fixing the docs, not as scope creep.
- **Fix neighbouring lies you notice.** If you are editing a list and spot another stale entry in it,
  correct that too — you are already there.
- **Preserve each file's voice.** `README.md` is public-facing and keeps its emoji section headers;
  `CLAUDE.md` is terse instruction prose; `DESIGN.md` is decisive design writing with named rules;
  `PRODUCT.md` states confirmed facts and marks open decisions.
- **Never hand-edit generated content**: `DESIGN.md`'s frontmatter or `.impeccable/design.json`'s
  token/shadow/motion/breakpoint fields. Edit `globals.css` and run `npm run design:sync`.
- **Do not invent sections** to describe work in progress. Document what the repo does today.

## Reporting

Every agent's final report must end with one of:

- `Docs: updated <file> § <section>` — one line per section touched, or
- `Docs: no change needed` — with a half-sentence saying why (e.g. "internal refactor, no documented
  fact changed").

Removing a duplicate counts and should be reported as such:
`Docs: updated README.md § Design System — removed, now points to DESIGN.md`.

A silent report is treated as an incomplete task. If you believe a doc claim is wrong but fixing it is
genuinely outside your task's scope, say so explicitly rather than leaving it unmentioned.
