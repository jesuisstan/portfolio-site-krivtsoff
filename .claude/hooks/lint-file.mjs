// PostToolUse(Edit|Write|MultiEdit): runs ESLint --fix on the edited file only, not the whole repo.
// Problems --fix cannot solve exit 2, so Claude sees them on the edit that caused them.
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const LINTABLE = /\.[cm]?[jt]sx?$/;
const SKIPPED = /(^|\/)(node_modules|\.next)\//;

let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  const filePath = JSON.parse(input || '{}')?.tool_input?.file_path ?? '';
  const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  const relative = path.relative(root, filePath);
  const outside = relative.startsWith('..') || path.isAbsolute(relative);

  if (!filePath || outside || !LINTABLE.test(relative) || SKIPPED.test(relative)) {
    process.exit(0);
  }

  const eslint = path.join(root, 'node_modules', '.bin', 'eslint');
  const result = spawnSync(eslint, ['--fix', '--no-warn-ignored', relative], {
    cwd: root,
    encoding: 'utf8'
  });

  if (result.error) {
    process.stderr.write(`lint-file: could not run ESLint (${result.error.message})\n`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.stderr.write(`ESLint left problems in ${relative}:\n${result.stdout}${result.stderr}`);
    process.exit(2);
  }
});
