const vscode = require("vscode");

const {
  LOGGING_LEVEL_CONFIG_PROP,
  SOURCE_TRACKING_CONFIG_PROP
} = require("./settings");

// Our modules consume the logger via the logger-wrapper module
const { getLogger } = require("./logger-wrapper");

/**
 * @param {vscode.ExtensionContext} context
 */
function listenToLogSettingsChanges(context) {
  // To enable dynamic logging level we must listen to VSCode configuration changes
  // on our `loggingLevelConfigProp` configuration setting.
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(LOGGING_LEVEL_CONFIG_PROP)) {
        const logLevel = vscode.workspace
          .getConfiguration()
          .get(LOGGING_LEVEL_CONFIG_PROP);

        getLogger().changeLevel(logLevel);
      }
    })
  );

  // Enable responding to changes in the sourceLocationTracking setting
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(SOURCE_TRACKING_CONFIG_PROP)) {
        const newSourceLocationTracking = vscode.workspace
          .getConfiguration()
          .get(SOURCE_TRACKING_CONFIG_PROP);

        getLogger().changeSourceLocationTracking(newSourceLocationTracking);
      }
    })
  );
}

module.exports = {
  listenToLogSettingsChanges
};
