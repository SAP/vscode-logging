# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0 (2024-01-05)

### Bug Fixes

- add .npmignore files to remove unneeded contents in published pkgs ([998b1f8](https://github.com/SAP/vscode-logging/commit/998b1f8341352af2bba9a640f425c66c2d3a8a74))
- convert timestamp format according to ISO-8601 ([b4ab3e4](https://github.com/SAP/vscode-logging/commit/b4ab3e48829df42bd73c67de3f068385aabd1259))
- source Location Tracking not affecting ChildLoggers ([72b151a](https://github.com/SAP/vscode-logging/commit/72b151a773ba2707cb131d59799389a7cfe93c85)), closes [#15](https://github.com/SAP/vscode-logging/issues/15)
- typo in the logging.level configuration description ([#181](https://github.com/SAP/vscode-logging/issues/181)) ([c05b17d](https://github.com/SAP/vscode-logging/commit/c05b17d4348e89f27a3cb86f2e20bc190cdf1afb))
- update yarn.lock ([#144](https://github.com/SAP/vscode-logging/issues/144)) ([33ec5ac](https://github.com/SAP/vscode-logging/commit/33ec5acfda275b9717a5986012667b8e854c6c5e))
- upgrade lodash version due to CVE-2021-23337 ([c514c16](https://github.com/SAP/vscode-logging/commit/c514c169ae5941cea9ebd5ae0dcb4eef8fc431d8))
- **logger:** vscode-logging/types package should be a dependency ([e2ea6c7](https://github.com/SAP/vscode-logging/commit/e2ea6c7d26efed219f2b983ad7e601eeb9f4704f))

### Features

- **wrapper:** remove dep to @types/vscode ([#167](https://github.com/SAP/vscode-logging/issues/167)) ([b362e5c](https://github.com/SAP/vscode-logging/commit/b362e5c3b11020ab09a5e705d7834fa53e8bd48e))
- logger wrapper package ([#163](https://github.com/SAP/vscode-logging/issues/163)) ([fc6abc5](https://github.com/SAP/vscode-logging/commit/fc6abc5ea43403c3039edb8589c68a0a339e5ebc))
- support console as log target ([#109](https://github.com/SAP/vscode-logging/issues/109)) ([ea16211](https://github.com/SAP/vscode-logging/commit/ea16211a5e2fbcdc86f4e96c8c60eaaf440d2431))
- **logger:** a memory leak when creating 9 or more ChildLogger's ([#76](https://github.com/SAP/vscode-logging/issues/76)) ([482c708](https://github.com/SAP/vscode-logging/commit/482c708e9b8643849f6a14253c51650ffac70416))
- aPI Fixes (dummy change to force minor version) ([0fb0fb6](https://github.com/SAP/vscode-logging/commit/0fb0fb624def760bb1a1cf4a7b46b18133d85cf0))
- initial Commit ([ee780af](https://github.com/SAP/vscode-logging/commit/ee780afa90dc17cfac91a28cb2921728c1cc4489))

### Reverts

- Revert "chore: include release number in release commit" ([d9d9c68](https://github.com/SAP/vscode-logging/commit/d9d9c68471476be517a06b3dd8712d573d3f7fa6))

* Make OutputChannel optional. (#55) ([b7fa564](https://github.com/SAP/vscode-logging/commit/b7fa56436693df9787f8ea720559beb3b0566612)), closes [#55](https://github.com/SAP/vscode-logging/issues/55) [#55](https://github.com/SAP/vscode-logging/issues/55)

### BREAKING CHANGES

- **wrapper:** `getConfigurations` and `onDidChangeConfiguration` properties
  were removed from the `configureLogger` public API
- OutputChannel will not be created inside the logger as today. Alternatively, it
  will be added as an optional parameter. The VS Code Extension will be able to create the
  OutputChannel and send it to the logger as a parameter.
