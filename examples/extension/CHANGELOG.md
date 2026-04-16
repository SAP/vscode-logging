# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/SAP/vscode-logging/compare/v2.0.8...v2.0.9) (2026-04-16)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.8](https://github.com/SAP/vscode-logging/compare/v2.0.7...v2.0.8) (2026-02-18)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.7](https://github.com/SAP/vscode-logging/compare/v2.0.6...v2.0.7) (2026-02-18)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.6](https://github.com/SAP/vscode-logging/compare/v2.0.5...v2.0.6) (2026-02-18)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.5](https://github.com/SAP/vscode-logging/compare/v2.0.4...v2.0.5) (2026-02-18)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.4](https://github.com/SAP/vscode-logging/compare/v2.0.3...v2.0.4) (2026-02-18)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.3](https://github.com/SAP/vscode-logging/compare/v2.0.2...v2.0.3) (2026-02-17)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.2](https://github.com/SAP/vscode-logging/compare/v2.0.1...v2.0.2) (2026-02-17)

**Note:** Version bump only for package vscode-logging-extension-example

## [2.0.1](https://github.com/SAP/vscode-logging/compare/v2.0.0...v2.0.1) (2026-02-15)

### Bug Fixes

- examples fix ([#242](https://github.com/SAP/vscode-logging/issues/242)) ([09afea5](https://github.com/SAP/vscode-logging/commit/09afea515f76238e2761c9cf5849bda589204794))
- upgrade lodash to version 4.17.23 ([#241](https://github.com/SAP/vscode-logging/issues/241)) ([69fc2ce](https://github.com/SAP/vscode-logging/commit/69fc2ce233e960219efca1118027638cc115874c))
- workspace protocol ([#243](https://github.com/SAP/vscode-logging/issues/243)) ([3091351](https://github.com/SAP/vscode-logging/commit/30913512554b29590b16bce4ad2a1eb3890b5dc9))

# 2.0.0 (2024-01-05)

### Bug Fixes

- typo in the logging.level configuration description ([#181](https://github.com/SAP/vscode-logging/issues/181)) ([c05b17d](https://github.com/SAP/vscode-logging/commit/c05b17d4348e89f27a3cb86f2e20bc190cdf1afb))

### Features

- initial Commit ([ee780af](https://github.com/SAP/vscode-logging/commit/ee780afa90dc17cfac91a28cb2921728c1cc4489))
- support console as log target ([#109](https://github.com/SAP/vscode-logging/issues/109)) ([ea16211](https://github.com/SAP/vscode-logging/commit/ea16211a5e2fbcdc86f4e96c8c60eaaf440d2431))

* Make OutputChannel optional. (#55) ([b7fa564](https://github.com/SAP/vscode-logging/commit/b7fa56436693df9787f8ea720559beb3b0566612)), closes [#55](https://github.com/SAP/vscode-logging/issues/55) [#55](https://github.com/SAP/vscode-logging/issues/55)

### BREAKING CHANGES

- OutputChannel will not be created inside the logger as today. Alternatively, it
  will be added as an optional parameter. The VS Code Extension will be able to create the
  OutputChannel and send it to the logger as a parameter.

## [1.1.3](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@1.1.2...vscode-logging-extension-example@1.1.3) (2021-04-13)

### Bug Fixes

- typo in the logging.level configuration description ([#181](https://github.com/SAP/vscode-logging/issues/181)) ([c05b17d](https://github.com/SAP/vscode-logging/commit/c05b17d4348e89f27a3cb86f2e20bc190cdf1afb))

## [1.1.2](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@1.1.1...vscode-logging-extension-example@1.1.2) (2020-12-10)

**Note:** Version bump only for package vscode-logging-extension-example

## [1.1.1](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@1.1.0...vscode-logging-extension-example@1.1.1) (2020-11-12)

**Note:** Version bump only for package vscode-logging-extension-example

# [1.1.0](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@1.0.1...vscode-logging-extension-example@1.1.0) (2020-07-29)

### Features

- support console as log target ([#109](https://github.com/SAP/vscode-logging/issues/109)) ([ea16211](https://github.com/SAP/vscode-logging/commit/ea16211a5e2fbcdc86f4e96c8c60eaaf440d2431))

## [1.0.1](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@1.0.0...vscode-logging-extension-example@1.0.1) (2020-05-21)

**Note:** Version bump only for package vscode-logging-extension-example

# [1.0.0](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@0.1.2...vscode-logging-extension-example@1.0.0) (2020-04-16)

- Make OutputChannel optional. (#55) ([b7fa564](https://github.com/SAP/vscode-logging/commit/b7fa56436693df9787f8ea720559beb3b0566612)), closes [#55](https://github.com/SAP/vscode-logging/issues/55) [#55](https://github.com/SAP/vscode-logging/issues/55)

### BREAKING CHANGES

- OutputChannel will not be created inside the logger as today. Alternatively, it
  will be added as an optional parameter. The VS Code Extension will be able to create the
  OutputChannel and send it to the logger as a parameter.

## [0.1.2](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@0.1.1...vscode-logging-extension-example@0.1.2) (2020-02-19)

**Note:** Version bump only for package vscode-logging-extension-example

## [0.1.1](https://github.com/SAP/vscode-logging/compare/vscode-logging-extension-example@0.1.0...vscode-logging-extension-example@0.1.1) (2020-01-20)

**Note:** Version bump only for package vscode-logging-extension-example

# 0.1.0 (2020-01-14)

### Features

- initial Commit ([ee780af](https://github.com/SAP/vscode-logging/commit/ee780afa90dc17cfac91a28cb2921728c1cc4489))
