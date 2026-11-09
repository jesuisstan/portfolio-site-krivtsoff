# Task workflow

## Scope

- Do what was asked; a bug fix does not need surrounding cleanup. What the change itself makes wrong is
  part of it — dead code it leaves, a doc it falsifies, a filter it empties. Anything else is a
  proposal, not an edit.
- Unclear task → one focused question before starting; discrete options go through `AskUserQuestion`.
  What the repo can answer, read instead of asking.
- The owner decides product facts, visible copy and anything beyond the request: propose, do not decide.
- Large tasks: logical steps, each checked before the next.

## Diagnosing

- Read the actual error and trace it to a root cause before proposing a fix; when it is ambiguous,
  check more than one cause. Base the diagnosis on the code, not on memory.
- Flag a red herring or a finding that contradicts the observed behaviour.
- React reports only the first hydration mismatch: fix it, reload, and re-check until the console is
  clean — a later one may have been hiding behind it.

## Proposing

Several approaches → a recommendation and its main tradeoff, not an exhaustive pros/cons list.

## Reversibility

- Prefer reversible actions; never use a destructive one (force-push, `reset --hard`, deleting files) as
  a shortcut past a failure.
- Ask before anything hard to undo or outward-facing — pushing, publishing, touching shared state —
  unless the user asked for exactly that.
