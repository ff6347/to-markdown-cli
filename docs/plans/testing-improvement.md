<!-- ABOUTME: Plan to improve the test suite with real integration coverage and new test runner. -->
<!-- ABOUTME: Details steps another engineer can follow without additional context. -->

# Plan: test suite improvement

## Goals

- Replace Jest-based tests with Node.js built-in test runner (preferred) or Vitest if Node test runner is insufficient.
- Increase integration coverage for the CLI and real file I/O without mocks.
- Ensure tests run via the default `npm run test` command.

## Assumptions and constraints

- Prefer Node.js built-in test runner (`node --test`).
- If built-in runner cannot support current TS/ESM needs with reasonable effort, use Vitest.
- Avoid mocked behavior in tests; use real files and processes.
- Keep changes minimal and aligned with existing code style.

## Step-by-step plan (detailed)

1. **Baseline discovery**
   - Read `src/` entrypoints to identify CLI flow and existing exports that need coverage.
   - Inspect current Jest config and how tests are invoked.
   - Verify how `npm run test` is used in CI (if any) and whether a shell test is expected.

2. **Decide on test runner**
   - Try a minimal Node.js test runner setup for TypeScript + ESM.
     - Evaluate if `node --test` can run `.ts` tests via `ts-node` or by running tests against compiled `dist/` output.
   - If TypeScript + ESM adds too much complexity with `node --test`, switch to Vitest.
   - Document the decision in this plan’s execution notes (future commit or journal entry).

3. **Convert or replace Jest tests**
   - Replace `__tests__/parse-flags.test.ts` and `__tests__/write-out.test.ts` with real integration tests that avoid mocks.
   - Target `dist/` output or real `src/` execution depending on chosen test runner.
   - For clipboard behavior, avoid testing clipboard internals; verify end-to-end behavior where feasible or explicitly skip if not feasible in CI.

4. **Add CLI integration tests**
   - Create tests that spawn the CLI (`node dist/html2md.js`) and verify:
     - stdin → stdout conversion.
     - `-i` input file → stdout.
     - `-o` output file creation.
     - `-g` (GFM) option affects output (task list/table inputs).
   - Use temp directories/files for input/output.

5. **Remove or rework the shell test**
   - If it duplicates new CLI tests, remove it to keep a single test runner.
   - If it covers clipboard edge cases, either integrate into new runner or document why it is not runnable in CI.

6. **Wire up `npm run test`**
   - Update `package.json` test script to use `node --test` or `vitest run`.
   - Remove Jest config and dependencies if no longer used.

7. **Validate and document**
   - Run `npm run test` and ensure clean output.
   - Update or add any brief docs for how tests are run (only if needed).

## Exit criteria

- `npm run test` executes the new test runner and passes.
- Tests cover CLI inputs/outputs with real file I/O.
- Jest is removed if no longer used.
- No tests rely on mocked behavior.
