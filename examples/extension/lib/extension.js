const { resolve } = require("path");
const vscode = require("vscode");
const { getExtensionLogger } = require("@vscode-logging/logger");
const {
  getLoggingLevelSetting,
  getSourceLocationTrackingSetting
} = require("./settings");
const { registerCommands } = require("./commands");
const { listenToLogSettingsChanges } = require("./settings-changes-handler");
const { callLibraryAndPassLogger } = require("./passing-logger-to-library");
const { getLogger, initLogger } = require("./logger-wrapper");

/**
 * Entry Point for a VSCode Extension.
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The `logPath` is only available from the `ExtensionContext`
  const logPath = context.logPath;
  const logLevelSetting = getLoggingLevelSetting();
  const sourceLocationTrackingSettings = getSourceLocationTrackingSetting();
  const meta = require(resolve(__dirname, "..", "package.json"));
  const logOutputChannel = vscode.window.createOutputChannel(meta.name);

  // The Logger must first be initialized before any logging commands may be invoked.
  const extLogger = getExtensionLogger({
    extName: meta.name,
    level: logLevelSetting,
    logPath: logPath,
    logOutputChannel: logOutputChannel,
    sourceLocationTracking: sourceLocationTrackingSettings,
    logConsole: true
  });

  // Update our logger-wrapper with a reference to the extLogger.
  initLogger(extLogger);

  // Lets log some useful entries...
  getLogger().info(
    `Extension: <${meta.name}> version: <${meta.version}> has been activated`
  );
  getLogger().info(`Rotating Log Files will be written to: <${logPath}>`);

  // Simple Dependency Injection example of using the VSCode Logger in a "consumed" npm library/package.
  callLibraryAndPassLogger();

  getLogger().info(`Testing logging info level`);
  getLogger().warn(`Testing logging warn level`);
  getLogger().error(`Testing logging error level`);

  registerCommands(context);

  // We must subscribe to settings changes, otherwise the Logger will always remain in its initial state.
  listenToLogSettingsChanges(context);
}

/**
 * this method is called when your extension is deactivated
 */
function deactivate() {
  getLogger().info(
    "Sad Sad Panda: <logging sample> extension was deactivated, why oh why?"
  );
}

module.exports = {
  activate,
  deactivate
};
