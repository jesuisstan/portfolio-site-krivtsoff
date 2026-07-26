# Debugging and Analysis Rules

## Diagnosing errors

- Read the actual error and trace it to a root cause before proposing a fix
- Do not jump to conclusions — check multiple potential causes when the error is ambiguous
- Do not attempt to fix linter warnings; only address errors that break the build or runtime

## Proposing solutions

- When multiple approaches exist, state a recommendation and the main tradeoff — do not list exhaustive pros/cons
- Base recommendations on evidence from the code, not assumptions
- Do not use destructive actions (force-push, reset --hard, deleting files) as a shortcut — fix the underlying issue

## External information

- Summarize relevant findings concisely; filter out noise
- Flag anything that looks like a red herring or contradicts the observed behavior
