[![CircleCI](https://circleci.com/gh/SAP/vscode-logging.svg?style=svg)](https://circleci.com/gh/SAP/vscode)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=SAP/vscode-loggging)](https://dependabot.com/)

# VSCode-Logging

VSCode-Logging is a [mono-repo][mono-repo] containing a a set of libraries to be used when implementing logging functionality
in [VSCode Extensions][vscode-ext].

It currently contains the following packages:

- [![npm-vscode-logging-logger][npm-vscode-logging-logger-image]][npm-vscode-logging-logger-url] [@vscode-logging/logger](./packages/logger) A logging library for VSCode Extensions.
- [![npm-vscode-logging-types][npm-vscode-logging-types-image]][npm-vscode-logging-types-url] [@vscode-logging/types](./packages/types) Common Logger Type Signatures to be used in [Dependency Injection][di] Scenarios.

[npm-vscode-logging-logger-image]: https://img.shields.io/npm/v/@vscode-logging/logger.svg
[npm-vscode-logging-logger-url]: https://www.npmjs.com/package/@vscode-logging/logger
[npm-vscode-logging-types-image]: https://img.shields.io/npm/v/@vscode-logging/types.svg
[npm-vscode-logging-types-url]: https://www.npmjs.com/package/@vscode-logging/types
[mono-repo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[vscode-ext]: https://code.visualstudio.com/api/get-started/your-first-extension
[di]: https://en.wikipedia.org/wiki/Dependency_injection

## Support

Please open [issues](https://github.com/SAP/vscode-logging/issues) on github.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](./LICENSE).
