[![CircleCI](https://circleci.com/gh/SAP/vscode-logging.svg?style=svg)](https://circleci.com/gh/SAP/vscode-logging)
[![Coverage Status](https://coveralls.io/repos/github/SAP/vscode-logging/badge.svg?branch=master)](https://coveralls.io/github/SAP/vscode-logging?branch=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=SAP/vscode-logging)](https://dependabot.com)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/vscode-logging)](https://api.reuse.software/info/github.com/SAP/vscode-logging)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/SAP/vscode-logging.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SAP/vscode-logging/context:javascript)

# VSCode-Logging

VSCode-Logging is a [mono-repo][mono-repo] containing a set of libraries to be used when implementing logging functionality
in [VSCode Extensions][vscode-ext].

It currently contains the following packages:

- [![npm-vscode-logging-logger][npm-vscode-logging-logger-image]][npm-vscode-logging-logger-url] [@vscode-logging/logger](./packages/logger) A logging library for VSCode Extensions.
- [![npm-vscode-logging-types][npm-vscode-logging-types-image]][npm-vscode-logging-types-url] [@vscode-logging/types](./packages/types) Common Logger Type Signatures to be used in [Dependency Injection][di] Scenarios.
- [![npm-vscode-logging-types][npm-vscode-logging-wrapper-image]][npm-vscode-logging-wrapper-url] [@vscode-logging/wrapper](./packages/wrapper) An optional wrapper and utilities to reduce boiler plate when consuming @vscode-logging/logger.

[npm-vscode-logging-logger-image]: https://img.shields.io/npm/v/@vscode-logging/logger.svg
[npm-vscode-logging-logger-url]: https://www.npmjs.com/package/@vscode-logging/logger
[npm-vscode-logging-types-image]: https://img.shields.io/npm/v/@vscode-logging/types.svg
[npm-vscode-logging-types-url]: https://www.npmjs.com/package/@vscode-logging/types
[npm-vscode-logging-wrapper-image]: https://img.shields.io/npm/v/@vscode-logging/wrapper.svg
[npm-vscode-logging-wrapper-url]: https://www.npmjs.com/package/@vscode-logging/wrapper
[mono-repo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[vscode-ext]: https://code.visualstudio.com/api/get-started/your-first-extension
[di]: https://en.wikipedia.org/wiki/Dependency_injection

## Support

Please open [issues](https://github.com/SAP/vscode-logging/issues) on github.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
