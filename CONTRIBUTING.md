# Contribution Guide


This is the common top level contribution guide for this mono-repo.
A sub-package **may** have an additional CONTRIBUTING.md file if needed.

## Legal

All contributors must sign the Developer Certificate of Origin (DCO)

- https://cla-assistant.io/SAP/vscode-logging

SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Pull Request Guidelines

When **contributing a New Feature** make sure to:

- use the `feat:` prefix in the [commit message header](#committing-changes).
- Add relevant test cases to the PR.
- Describe the reason for this new feature in the PR (The **Why**, not just **How**...)
  - For significant changes it is recommended to first open an issue to discuss the proposed feature
    and ensure it fits the project's goals.

When **Fixing a Bug**:

- use the `fix:` prefix in the [commit message header](#committing-changes).
- Add a detailed description of the bug to the PR or open a new issue with the bug's description (if none exists).
- Link the PR and Commit message to the bug using

In general:

- Keep your PRs focused on a single topic.
- It is fine if there are multiple commits in a PR, but they must all be related to a single issue
  and then be squashed into a single commit when merged to master.
- Remember to Sign the [DCO](#legal) in the PR
  - You will be automatically asked this the first time you contribute to this project via a PR comment.

## Development Environment

### pre-requisites

- [pnpm](https://pnpm.io/installation) >= 8
- An [LTS version](https://nodejs.org/en/about/releases/) of node.js
  - This package is targeted and tested on modern/supported versions of node.js only.

### Initial Setup

The initial setup is trivial:

- clone this repo
- `pnpm i`

### Committing Changes

This project enforces [Angular style](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) commit message conventions
using a pre-commit hook.

### Formatting.

[Prettier](https://prettier.io/) is used to ensure consistent code formatting in this repository.
This is normally transparent as it automatically activated in a pre-commit hook using [lint-staged](https://github.com/okonet/lint-staged).
However this does mean that dev flows that do not use a full dev env (e.g editing directly on github)
may result in voter failures due to formatting errors.

### Testing

[Mocha][mocha] is used for unit-testing and [Istanbul/Nyc][istanbul] for coverage reports.
Jest was avoided due to increased total tests execution time due to running the tests in multiple processes,
as the Parser initialization (which happens once per process) can take 10-20ms.

[mocha]: https://mochajs.org/
[istanbul]: https://istanbul.js.org/

- To run the tests run `pnpm test` in a specific subpackage.

### Test Coverage

100%\* Test Coverage is enforced for all productive code in this mono repo.

- Specific statements/functions may be [excluded][ignore_coverage] from the report but the reason for that must
  specified in the source code.

[ignore_coverage]: https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md

### Full Build

This project does not use any compilation step (Babel/TypeScript), this means that the full build
does not generate any artifacts for runtime.

- To run the full **C**ontinuous **I**ntegration build run `pnpm ci` in in either the top level package or a specific subpackage.

### Release Life-Cycle.

This monorepo uses Lerna's [fixed / locked][lerna-mode] mode 
and automatically generates the changelog by adhering to [Conventional Commits][cc]

[lerna-mode]: https://lerna.js.org/docs/features/version-and-publish#fixedlocked-mode-default
[cc]: https://www.conventionalcommits.org/en/v1.0.0/

### Release Process

Performing a release requires push permissions to this repository.

- Ensure you are on `master` branch and synced with origin.
- `pnpm run release:version`
- Follow the lerna CLI instructions.
- Track the `release` build on github actions
- Once the `release` build has finished successfully inspect the npm registry to see the new versions
  for all the **changed** packages of this mono-repo.
  - `npm view [package-name] version`
