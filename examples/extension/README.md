# @vscode-logging Extension Example

This folder contains a sample VS code extension that demonstrates
how to integrate @vscode-logging/logger in a VSCode extension.

## Running the Sample

### Initial setup (once)

- `yarn` in this repository's **root**.

### Run/Debug the Example Extension in VSCode

- Open this example folder in VSCode.
- Press F5 in VSCode to start the example Extension.

### Basic logging flow

- Activate the **Hello World Command**: `View Menu -> Command Palette -> Hello World`
- Open the **Output Panel**: `View Menu -> Output`
- Switch to the `vscode-logging-extension-example` output Channel using the dropdown.
- Inspect the output channel log and note that the location of the log **Files** was written.
- Inspect the contents of the log files using your favorite file system explorer.

### Changing logging Configuration.

- Open the **Settings Page**: `File -> Preferences -> Settings`
- Locate the **Example_Logging: Logging Level** configuration.
- Play with these settings and inspect how the logging output changes.

## Points of Interest in this Example:

- [extension.js](./lib/extension.js) - The main entry point and where the `activate()` method is implemented.
- [logger-wrapper.js](./lib/logger-wrapper.js) - Access point to the Logger for our VSCode Extension Files/Modules.
- [package.json -> configuration](./package.json) - Declaring end user configurable logging settings.
- [settings.js](./lib/settings.js) - Logic to read the logging configuration from the VSCode settings.
- [settings-changes-handler.js](./lib/settings-changes-handler.js) - Listening to VSCode settings changes and reacting by updating the Logger configuration.
- [passing-logger-to-library.js](./lib/passing-logger-to-library.js) - A simple Dependency Injection of the Logger to a consumed (external) library.
- [commands.js](./lib/commands.js) - The implementation of the `Hello World` Command.
