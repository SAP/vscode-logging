# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0 (2024-01-05)

### Bug Fixes

- add .npmignore files to remove unneeded contents in published pkgs ([998b1f8](https://github.com/sap/vscode-logging/commit/998b1f8341352af2bba9a640f425c66c2d3a8a74))
- convert timestamp format according to ISO-8601 ([b4ab3e4](https://github.com/sap/vscode-logging/commit/b4ab3e48829df42bd73c67de3f068385aabd1259))
- **logger:** vscode-logging/types package should be a dependency ([e2ea6c7](https://github.com/sap/vscode-logging/commit/e2ea6c7d26efed219f2b983ad7e601eeb9f4704f))
- source Location Tracking not affecting ChildLoggers ([72b151a](https://github.com/sap/vscode-logging/commit/72b151a773ba2707cb131d59799389a7cfe93c85)), closes [#15](https://github.com/sap/vscode-logging/issues/15)

### Features

- support console as log target ([#109](https://github.com/sap/vscode-logging/issues/109)) ([ea16211](https://github.com/sap/vscode-logging/commit/ea16211a5e2fbcdc86f4e96c8c60eaaf440d2431))
- **logger:** a memory leak when creating 9 or more ChildLogger's ([#76](https://github.com/sap/vscode-logging/issues/76)) ([482c708](https://github.com/sap/vscode-logging/commit/482c708e9b8643849f6a14253c51650ffac70416))
- aPI Fixes (dummy change to force minor version) ([0fb0fb6](https://github.com/sap/vscode-logging/commit/0fb0fb624def760bb1a1cf4a7b46b18133d85cf0))
- initial Commit ([ee780af](https://github.com/sap/vscode-logging/commit/ee780afa90dc17cfac91a28cb2921728c1cc4489))

* Make OutputChannel optional. (#55) ([b7fa564](https://github.com/sap/vscode-logging/commit/b7fa56436693df9787f8ea720559beb3b0566612)), closes [#55](https://github.com/sap/vscode-logging/issues/55) [#55](https://github.com/sap/vscode-logging/issues/55)

### BREAKING CHANGES

- OutputChannel will not be created inside the logger as today. Alternatively, it
  will be added as an optional parameter. The VS Code Extension will be able to create the
  OutputChannel and send it to the logger as a parameter.

## [1.2.3](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@1.2.2...@vscode-logging/logger@1.2.3) (2021-04-13)

**Note:** Version bump only for package @vscode-logging/logger

## [1.2.2](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@1.2.1...@vscode-logging/logger@1.2.2) (2020-12-10)

**Note:** Version bump only for package @vscode-logging/logger

## [1.2.1](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@1.2.0...@vscode-logging/logger@1.2.1) (2020-11-12)

### Bug Fixes

- convert timestamp format according to ISO-8601 ([b4ab3e4](https://github.com/sap/vscode-logging/commit/b4ab3e48829df42bd73c67de3f068385aabd1259))

# [1.2.0](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@1.1.0...@vscode-logging/logger@1.2.0) (2020-07-29)

### Features

- support console as log target ([#109](https://github.com/sap/vscode-logging/issues/109)) ([ea16211](https://github.com/sap/vscode-logging/commit/ea16211a5e2fbcdc86f4e96c8c60eaaf440d2431))

# [1.1.0](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@1.0.0...@vscode-logging/logger@1.1.0) (2020-05-21)

### Features

- **logger:** a memory leak when creating 9 or more ChildLogger's ([#76](https://github.com/sap/vscode-logging/issues/76)) ([482c708](https://github.com/sap/vscode-logging/commit/482c708e9b8643849f6a14253c51650ffac70416))

# [1.0.0](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@0.1.2...@vscode-logging/logger@1.0.0) (2020-04-16)

- Make OutputChannel optional. (#55) ([b7fa564](https://github.com/sap/vscode-logging/commit/b7fa56436693df9787f8ea720559beb3b0566612)), closes [#55](https://github.com/sap/vscode-logging/issues/55) [#55](https://github.com/sap/vscode-logging/issues/55)

### BREAKING CHANGES

- OutputChannel will not be created inside the logger as today. Alternatively, it
  will be added as an optional parameter. The VS Code Extension will be able to create the
  OutputChannel and send it to the logger as a parameter.

## [0.1.2](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@0.1.1...@vscode-logging/logger@0.1.2) (2020-02-19)

### Bug Fixes

- add .npmignore files to remove unneeded contents in published pkgs ([998b1f8](https://github.com/sap/vscode-logging/commit/998b1f8341352af2bba9a640f425c66c2d3a8a74))
- **logger:** vscode-logging/types package should be a dependency ([e2ea6c7](https://github.com/sap/vscode-logging/commit/e2ea6c7d26efed219f2b983ad7e601eeb9f4704f))

## [0.1.1](https://github.com/sap/vscode-logging/compare/@vscode-logging/logger@0.1.0...@vscode-logging/logger@0.1.1) (2020-01-20)

### Bug Fixes

- source Location Tracking not affecting ChildLoggers ([72b151a](https://github.com/sap/vscode-logging/commit/72b151a773ba2707cb131d59799389a7cfe93c85)), closes [#15](https://github.com/sap/vscode-logging/issues/15)

# 0.1.0 (2020-01-14)

### Features

- aPI Fixes (dummy change to force minor version) ([0fb0fb6](https://github.com/sap/vscode-logging/commit/0fb0fb624def760bb1a1cf4a7b46b18133d85cf0))
- initial Commit ([ee780af](https://github.com/sap/vscode-logging/commit/ee780afa90dc17cfac91a28cb2921728c1cc4489))
