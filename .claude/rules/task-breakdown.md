# Task Breakdown Rules

## Scoping work

- Implement only what the task requires — a bug fix does not need surrounding cleanup
- Do not introduce abstractions, refactors, or "nice-to-have" improvements beyond the explicit request
- If the task is unclear, ask one focused clarifying question before starting

## Complex tasks

- Break large tasks into logical steps and complete them sequentially
- Verify each step before moving to the next
- When blocked, diagnose the root cause rather than working around it

## Asking for context

- Before proposing a solution to a complex error, ask for the specific information needed (error logs, relevant code, environment details)
- Prioritize the most critical context first — do not ask for everything at once

## Reversibility

- Prefer reversible actions over destructive ones
- For actions that affect shared state (pushing, closing PRs, modifying CI) or are hard to reverse (force push, reset --hard), confirm with the user before proceeding
