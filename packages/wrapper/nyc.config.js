module.exports = {
  reporter: ["text", "lcov"],
  "check-coverage": false,
  all: true,
  include: ["dist/src/**/*.js"],
  exclude: [
    // The `api.ts` is the only file which imports("vscode")
    // We could still test it (e.g: with `proxyquire`)
    // However the added value of such a test is smaller than
    // the overhead cost of implementing such a test:
    // - The api.ts only
    //   1. Import needed params from `vscode` package.
    //   2. merges user arguments with `vscode` params and calls an internal API.
    //
    // - These merges are partially "tested" at design time by TSC.
    // - Implementing a test with proxyquire would not test real VSCode scenarios
    // - The existing `configureLogger` tests are fairly complex and we are better off avoiding duplicating them.
    //   - See: `configure-logger-spec.ts`.
    "dist/src/api.js"
  ],
  excludeAfterRemap: false
};
