# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
