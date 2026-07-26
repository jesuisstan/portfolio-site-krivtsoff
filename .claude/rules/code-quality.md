# Code Quality Rules

## General

- Write clean, production-ready code
- Arrow function syntax for all components and functions
- Strict TypeScript everywhere — explicit types on arrays, generics, callbacks; no `any`. The repo is
  fully `.ts`/`.tsx`; never add a `.js`/`.jsx` file under `src/`
- Prefer built-in APIs over custom logic

## Scope

- Implement only what the task requires — no extra features, refactoring, or abstractions
- Three similar lines is better than a premature abstraction
- Do not design for hypothetical future requirements

## Error handling

- Only validate at system boundaries (user input, external APIs)
- Do not add error handling, fallbacks, or validation for scenarios that cannot happen
- Trust internal code and framework guarantees

## Comments

- Default to no comments
- Add a comment only when the WHY is non-obvious: a hidden constraint, a subtle invariant, a workaround for a specific bug
- Never explain WHAT the code does — well-named identifiers do that
- Never write multi-line comment blocks; one short line max
- All comments must be in English

## JSDoc

Required on all new exported functions. Keep it concise:

```ts
/** Returns the projects matching the given category filter. */
const filterProjects = (projects: Project[], category: string): Project[] => { ... }
```

- First line: one-sentence imperative summary ("Fetches…", "Calculates…", not "This function…")
- `@param` for every argument
- `@returns` always (even if `void`)
- No additional paragraphs unless the behavior would genuinely surprise a reader

## Linting

- Do not fix lint warnings proactively
- Only address issues that break the build or runtime
