# @vscode-logging/types

Types used by @vscode-logging/logger extracted to a separate package to enable
in-direct dependents to type check against the correct interfaces.

For example imagine a VSCode extension called `Foo` which uses an npm package called `Bar`
as a dependency and `Bar` APIs can accept an optional logger implementation:

```typescript
// Code in `Bar` npm package
// -------------------------------------------------------

// By defining the `IChildLogger` interface` in `@vscode-logging/types`
// `Bar` only depends (dev dependency) on the interface **not** the implementation.
import { IChildLogger } from "@vscode-logging/types";

export function add(lhs: number, rhs: number, logger: IChildLogger): number {
  logger.info("Entering <add> function with params:", { lhs: lhs, rhs: rhs });
  return lhs + rhs;
}
```

## Installation

With npm:

- `npm install @vscode-logging/types --save-dev`

With Yarn:

- `yarn add @vscode-logging/types --dev`

## Usage

As shown above, simply import the `IChildLogger` interface and use it to define
the type of your injected logger implementation.

## Support

Please open [issues](https://github.com/SAP/vscode-logging/issues) on github.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../../LICENSE).
