# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/SAP/vscode-logging/compare/v2.0.8...v2.0.9) (2026-04-16)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.8](https://github.com/SAP/vscode-logging/compare/v2.0.7...v2.0.8) (2026-02-18)

### Bug Fixes

- correct repository URL case (SAP instead of sap) for npm provenance ([00a91ca](https://github.com/SAP/vscode-logging/commit/00a91ca002ba88ed27278f756b7aca8865eee1ee))

## [2.0.7](https://github.com/sap/vscode-logging/compare/v2.0.6...v2.0.7) (2026-02-18)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.6](https://github.com/sap/vscode-logging/compare/v2.0.5...v2.0.6) (2026-02-18)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.5](https://github.com/sap/vscode-logging/compare/v2.0.4...v2.0.5) (2026-02-18)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.4](https://github.com/sap/vscode-logging/compare/v2.0.3...v2.0.4) (2026-02-18)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.3](https://github.com/sap/vscode-logging/compare/v2.0.2...v2.0.3) (2026-02-17)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.2](https://github.com/sap/vscode-logging/compare/v2.0.1...v2.0.2) (2026-02-17)

**Note:** Version bump only for package @vscode-logging/wrapper

## [2.0.1](https://github.com/sap/vscode-logging/compare/v2.0.0...v2.0.1) (2026-02-15)

### Bug Fixes

- upgrade lodash to version 4.17.23 ([#241](https://github.com/sap/vscode-logging/issues/241)) ([69fc2ce](https://github.com/sap/vscode-logging/commit/69fc2ce233e960219efca1118027638cc115874c))
- workspace protocol ([#243](https://github.com/sap/vscode-logging/issues/243)) ([3091351](https://github.com/sap/vscode-logging/commit/30913512554b29590b16bce4ad2a1eb3890b5dc9))

# 2.0.0 (2024-01-05)

### Bug Fixes

- upgrade lodash version due to CVE-2021-23337 ([c514c16](https://github.com/sap/vscode-logging/commit/c514c169ae5941cea9ebd5ae0dcb4eef8fc431d8))

### Features

- **wrapper:** remove dep to @types/vscode ([#167](https://github.com/sap/vscode-logging/issues/167)) ([b362e5c](https://github.com/sap/vscode-logging/commit/b362e5c3b11020ab09a5e705d7834fa53e8bd48e))
- logger wrapper package ([#163](https://github.com/sap/vscode-logging/issues/163)) ([fc6abc5](https://github.com/sap/vscode-logging/commit/fc6abc5ea43403c3039edb8589c68a0a339e5ebc))

### BREAKING CHANGES

- **wrapper:** `getConfigurations` and `onDidChangeConfiguration` properties
  were removed from the `configureLogger` public API

## [1.0.2](https://github.com/sap/vscode-logging/compare/@vscode-logging/wrapper@1.0.1...@vscode-logging/wrapper@1.0.2) (2021-09-12)

### Bug Fixes

- upgrade lodash version due to CVE-2021-23337 ([c514c16](https://github.com/sap/vscode-logging/commit/c514c169ae5941cea9ebd5ae0dcb4eef8fc431d8))

## [1.0.1](https://github.com/sap/vscode-logging/compare/@vscode-logging/wrapper@1.0.0...@vscode-logging/wrapper@1.0.1) (2021-04-13)

**Note:** Version bump only for package @vscode-logging/wrapper

# [1.0.0](https://github.com/sap/vscode-logging/compare/@vscode-logging/wrapper@0.2.0...@vscode-logging/wrapper@1.0.0) (2021-02-10)

### Features

- **wrapper:** remove dep to @types/vscode ([#167](https://github.com/sap/vscode-logging/issues/167)) ([b362e5c](https://github.com/sap/vscode-logging/commit/b362e5c3b11020ab09a5e705d7834fa53e8bd48e))

### BREAKING CHANGES

- **wrapper:** `getConfigurations` and `onDidChangeConfiguration` properties
  were removed from the `configureLogger` public API

# 0.2.0 (2021-02-07)

### Features

- logger wrapper package ([#163](https://github.com/sap/vscode-logging/issues/163)) ([fc6abc5](https://github.com/sap/vscode-logging/commit/fc6abc5ea43403c3039edb8589c68a0a339e5ebc))
