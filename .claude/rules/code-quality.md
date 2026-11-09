---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'scripts/**'
  - '*.config.{ts,mjs,js}'
---

# Code quality

`CLAUDE.md` § Code conventions states the shape; this file holds the detail.

- Strict TypeScript: no `any` (narrow `unknown`), explicit types on exported APIs, arrays and callbacks.
  Never add a `.js`/`.jsx` file under `src/`.
- Arrow functions assigned to a `const`; the file's primary component is the bottom `export default`.
- JSDoc on every new exported function or component: one imperative sentence ("Returns…", not "This
  function…"), `@param` per argument, `@returns` always (even `void`); a second paragraph only when the
  behaviour would surprise a reader.

  ```ts
  /** Returns the projects matching the given category filter. */
  ```

- Comments: none by default. One short line when the why is not obvious — a hidden constraint, an
  invariant, a workaround — never what the code does. English only.
- Validate only at boundaries (user input, external responses); no fallbacks for states that cannot
  happen.
- No premature abstraction: three similar lines beat a speculative helper.
- Rendering never branches on a browser-only value read during render (`useReducedMotion()`, `window`,
  `matchMedia`): the server and the hydration render must agree — use `useMediaQuery` from
  `src/lib/media-query.ts` (`CLAUDE.md` § Code conventions).
- Lint: after every edit a hook (`.claude/hooks/lint-file.mjs`) runs ESLint `--fix` on that file and
  reports what it could not fix — fix those before moving on. Don't chase warnings; fix what breaks
  lint, types, the build or runtime.
