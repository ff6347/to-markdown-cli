<!-- ABOUTME: Plan to update dependencies in a safe, incremental sequence. -->
<!-- ABOUTME: Defines verification steps and rollback points for upgrades. -->

# Plan: dependency updates

## Goals

- Update dependencies in small, verifiable steps.
- Keep runtime behavior stable and ensure tests pass after each change.
- Align installed versions with declared versions.

## Assumptions and constraints

- Use `pnpm` with `--save-exact` for installs.
- Update dependencies incrementally, one group at a time.
- Run tests after each update set.

## Step-by-step plan (detailed)

1. **Baseline check**
   - Ensure working tree is clean.
   - Run `pnpm run test` to confirm the current baseline (once test suite is updated).

2. **Align installed versions**
   - Run `pnpm install --save-exact` to align `node_modules` with `package.json`.
   - Verify `pnpm outdated` and record the list for the upgrade plan.

3. **Low-risk patch/minor updates (dev + runtime)**
   - Update small patch/minor versions first (e.g., `turndown`, `mock-fs`, `ts-jest` if still used, `typescript`, `@types/*`).
   - Run `pnpm run build` and `pnpm run test` after each batch.

4. **Tooling majors (dev dependencies)**
   - Update lint/test tooling majors one at a time:
     - `eslint` + related plugins/configs.
     - `jest` + `@types/jest` (if still in use) or `vitest` if adopted.
   - Run lint/test after each change and fix config changes immediately.

5. **Runtime majors**
   - Update `commander` major version and fix any CLI API changes.
   - Update `clipboardy` major version and adjust any API/ESM changes.
   - Run full build + test suite after each runtime update.

6. **Final verification**
   - Run `pnpm run build`, `pnpm run test`, and `pnpm run lint`.
   - Confirm `pnpm outdated` is clean or only contains known holds.

## Exit criteria

- All dependency updates are reflected in `package.json` and `package-lock.json`.
- Tests, build, and lint pass.
- No runtime behavior regressions detected by integration tests.
