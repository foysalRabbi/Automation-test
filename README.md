# Automation-test

This repository contains TypeScript-based Playwright tests and Playwright configuration for end-to-end and API testing. The README below focuses only on the TypeScript + Playwright portions of the project.

## What this repo contains (relevant)
- Playwright configuration: `playwright.config.ts` (reads `.env.test`, `data/` files, and `storageState.json`)
- Test sources: `src/` (Playwright tests written in TypeScript; testDir is `src/tests/` as configured)
- Test data: `data/` (CSV and JSON used by the Playwright config)
- `storageState.json` used by the `e2e` project for authenticated sessions
- `package.json` and lockfile for Node/Playwright dependencies

Notes:
- The Playwright config reads `.env.test` for environment variables and imports `data/user_registration.json` and `data/users.csv`.
- Important environment variables referenced by the config: `BASE_URL` and `API_URL`.

## Prerequisites
- Node.js 16+ (or an LTS version compatible with Playwright)
- npm (or yarn)
- Recommended: Git for version control

## Install dependencies

```bash
# from repo root
npm install
# install Playwright browsers (if needed)
npx playwright install
```

## Playwright configuration overview

Key settings from `playwright.config.ts`:
- testDir: `src/tests/`
- reporter: HTML reporter (not opened automatically)
- expect timeout: 10_000 ms
- use:
  - headless: false (configured)
  - baseURL: from `process.env.BASE_URL`
  - Desktop Chrome device emulation
  - screenshot: `only-on-failure`
  - video: `retain-on-failure`
- Projects:
  - `setup` — matches `*global.setup.ts`
  - `teardown` — matches `*global.teardown.ts`
  - `e2e` — depends on `setup`, uses `storageState.json`, and runs teardown after
  - `api_tests` — uses `process.env.API_URL` as baseURL

The Playwright config also parses `data/users.csv` and loads `data/user_registration.json` at startup, so ensure the `data/` files remain present when running tests.

## Running tests
Run the full Playwright test suite:

```bash
npx playwright test
```

Run a specific project (example: e2e):

```bash
npx playwright test --project=e2e
```

Run a single test file:

```bash
npx playwright test src/tests/example.spec.ts
```

Generate HTML report (after a run):

```bash
npx playwright show-report
```

## Test data
- data/users.csv — CSV of test users (parsed by `playwright.config.ts`)
- data/user_registration.json — example JSON payload used by tests
- storageState.json — saved authentication state for `e2e` project

## Environment
Place environment variables in `.env.test` (used by the Playwright config). Common variables:
- BASE_URL — base URL for browser tests
- API_URL — base URL for API tests

## Contributing
- Keep tests in TypeScript under `src/tests/`
- Follow Playwright best practices:
  - Use fixtures when sharing state
  - Keep tests deterministic and isolated
  - Use `test.describe`, `test.beforeEach` / `test.afterEach` for setup/teardown

## Troubleshooting
- If tests fail due to missing browsers: run `npx playwright install`
- If Playwright cannot find environment variables: check `.env.test` is present and readable
- If `data/` files are missing or malformed, the Playwright config may throw on parse

## License & contact
- License: (add license file or specify here)
- Contact: @foysalRabbi

---
This README focuses exclusively on the TypeScript + Playwright portions of the repository. Update or expand sections to match any additional project-specific scripts or conventions.