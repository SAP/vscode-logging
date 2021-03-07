# @vscode-logging/logger

A Logging Library for VSCode Extension which supports the following features:

- JSON structure log entries output.
- Logging to a VSCode outputChannel.
- Logging to rolling file logs.
- [Source Location Tracking](#on-sourcelocationtracking).

## Installation

With npm:

- `npm install @vscode-logging/logger --save`

With Yarn:

- `yarn add @vscode-logging/logger`

## Usage

Please see the [TypeScript Definitions](./api.d.ts) for full API details.

Runnable and documented usage examples can be found in the [examples](../../examples) folder.
It is recommended to review these examples as integrating @vscode-logging/logger into a
VSCode Extension necessitates **multiple changes**, mainly around managing the configuration options
as user exposed settings.

### Basic Usage

The only function exposed (directly) by @vscode-logging/logger is `getExtensionLogger` which
should be invoked by a VSCode extension's `activate()` function.

```javascript
const { getExtensionLogger } = require("@vscode-logging/logger");

function activate(context) {
  const extLogger = getExtensionLogger({
    extName: "MyExtName",
    level: "info", // See LogLevel type in @vscode-logging/types for possible logLevels
    logPath: context.logPath, // The logPath is only available from the `vscode.ExtensionContext`
    logOutputChannel: logOutputChannel, // OutputChannel for the logger
    sourceLocationTracking: false,
    logConsol: false // define if messages should be logged to the consol
  });

  extLogger.warn("Hello World");
  // Will Log The following entry to **both**
  //   - To outputChannel `logOutputChannel`
  //   - To log files in `logPath`
  // {
  //   "label": "MyExtName",
  //   "level": "warn",
  //   "message": "Hello World",
  //   "time": "2020-01-10 15:29:52.038Z"
  // }
}
```

### On ChildLoggers

The `getChildLogger` API is available on the interface returned by `getExtensionLogger`.
This can be used to obtain sub logger which log to the same targets (outChannel/files) as
the root logger, but with a more specific label.

```javascript
const { getExtensionLogger } = require("@vscode-logging/logger");

const extLogger = getExtensionLogger({ extName: "MyExtName" /* ... */ });

const childLogger = extLogger.getChildLogger({ label: "MyClass" });
childLogger.warn("Hello World");
// Will Log to the same targets as extLogger but with a suffix added to the `label`
// {
//   "label": "MyExtName.MyClass", // Note the `.MyClass` suffix in the label
//   "level": "warn",
//   "message": "Hello World",
//   "time": "2020-01-10 15:29:52.038Z"
// }

const grandChildLogger = childLogger.getChildLogger({ label: "MyMethod" });
grandChildLogger.warn("Hip Hip Hurray");
// {
//   "label": "MyExtName.MyClass.MyMethod", // Note the `.MyMethod` suffix in the label
//   "level": "warn",
//   "message": "Hello World",
//   "time": "2020-01-10 15:30:52.038Z"
// }
```

Important notes on child loggers:

- They share the same configuration (e.g logging level) as the root extension logger.
- Child Loggers cannot change their configuration, all configuration mutation must be done
  via the root extension logger.
- Child Loggers can be created from other child loggers, the `label` property would simply
  expend with the additional suffixes.
- Child Loggers are **cached** using their label as the key, so repeatedly calling `getChildLogger`
  using the same `label` on the same Logger object would return the **same** childLogger object.

### On `sourceLocationTracking`

When enabled the `sourceLocationTracking` will augment the log entries with the function
name and location (file/line/column) where the log method was invoked, e.g:

```json
{
  "label": "osem",
  "level": "error",
  "message": "Hip Hip Hurray, the <Hello World> Command was executed! counter: <1>",
  "source": {
    "function": "registerCalback",
    "location": "c:\\workspace\\vscode-logging\\examples\\extension\\lib\\commands.js:21:19"
  },
  "time": "2020-01-11 11:51:48.659Z"
}
```

Important things to note on `sourceLocationTracking`

- This functionality is not guaranteed to always work.
- e.g anonymous functions have no name...

- Obtaining the source location information is **very slow**.

  - This means that this feature should **not be used** in productive flows.
  - Therefore A "Fatal" log entry will be logged each time this option is enabled.

- Processes which manipulate the source code such as [bundling][vscode-bundling] or compilation (TypeScript/Babel)
  may make the information produced less relevant due to the lack of sourceMaps support.
  Therefore this feature may be more useful during development flows rather then productive flows.

[vscode-bundling]: https://code.visualstudio.com/api/working-with-extensions/bundling-extension

## Support

Please open [issues](https://github.com/SAP/vscode-logging/issues) on github.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../../LICENSE).
