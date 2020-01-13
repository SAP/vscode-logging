const vscode = require("vscode");

/**
 * Note that the values of these configuration properties must match those defined in the package.json
 */
const LOGGING_LEVEL_CONFIG_PROP = "Example_Logging.loggingLevel";
const SOURCE_TRACKING_CONFIG_PROP = "Example_Logging.sourceLocationTracking";

/**
 * @returns {LogLevel}
 */
function getLoggingLevelSetting() {
  return vscode.workspace.getConfiguration().get(LOGGING_LEVEL_CONFIG_PROP);
}

/**
 * @returns {boolean}
 */
function getSourceLocationTrackingSetting() {
  return vscode.workspace.getConfiguration().get(SOURCE_TRACKING_CONFIG_PROP);
}

module.exports = {
  LOGGING_LEVEL_CONFIG_PROP,
  SOURCE_TRACKING_CONFIG_PROP,
  getLoggingLevelSetting,
  getSourceLocationTrackingSetting
};
