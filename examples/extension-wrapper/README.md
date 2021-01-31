# @vscode-logging Extension-Wrapper Example

This folder contains a sample VS code extension that demonstrates
how to integrate @vscode-logging/**wrapper** in a VSCode extension.

## Running the Sample

### Initial setup (once)

- `yarn` in this repository's **root**.

### Run/Debug the Example Extension in VSCode

- Open this example folder in VSCode.
- Press F5 in VSCode to start the example Extension.

### Basic logging flow

- Activate the **Hello World Command**: `View Menu -> Command Palette -> Hello World`
- Open the **Output Panel**: `View Menu -> Output`
- Switch to the `logging-wrapper-example` output Channel using the dropdown.
- Inspect the output channel log and note that the location of the log **Files** was written.
- Inspect the contents of the log files using your favorite file system explorer.

### Changing logging Configuration.

- Open the **Settings Page**: `File -> Preferences -> Settings`
- Locate the **Example_Logging: Logging Level** configuration.
- Play with these settings and inspect how the logging output changes.

## Points of Interest in this Example:

- [extension.ts](./src/extension.ts) - `configureLogger` API invocation (inside `activate` function).
- [logger.ts](./src/logger.ts) - State management for the logger instance.
- [commands.ts](./src/commands.ts) - The implementation of the `Hello World` Command.
