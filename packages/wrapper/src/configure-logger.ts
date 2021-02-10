import { workspace } from "vscode";
import { getExtensionLogger } from "@vscode-logging/logger";
import { IVSCodeExtLogger } from "@vscode-logging/types";
import { ConfigureLoggerOpts } from "../api";
import {
  getLoggingLevelSetting,
  getSourceLocationTrackingSetting
} from "./settings";
import {
  listenToLogSettingsChanges,
  logLoggerDetails
} from "./settings-changes-handler";

export type ConfigureLoggerDIOpts = {
  /**
   * The `vscode.workspace.getConfiguration` method.
   * Note this is the method itself, not the returned value from executing it.
   */
  getConfiguration: typeof workspace.getConfiguration;
  /**
   * The `vscode.workspace.onDidChangeConfiguration` method.
   * Note this is the method itself, not the returned value from executing it.
   */
  onDidChangeConfiguration: typeof workspace.onDidChangeConfiguration;
};

export type configureLoggerInternalOpts = ConfigureLoggerOpts &
  ConfigureLoggerDIOpts;

export function configureLoggerInternal(
  opts: configureLoggerInternalOpts
): IVSCodeExtLogger {
  const logLevelSetting = getLoggingLevelSetting({
    getConfiguration: opts.getConfiguration,
    loggingLevelProp: opts.loggingLevelProp
  });

  const sourceLocationTrackingSettings = getSourceLocationTrackingSetting({
    getConfiguration: opts.getConfiguration,
    sourceLocationProp: opts.sourceLocationProp
  });

  const extensionLogger = getExtensionLogger({
    extName: opts.extName,
    level: logLevelSetting,
    logPath: opts.logPath,
    sourceLocationTracking: sourceLocationTrackingSettings,
    logConsole: opts.logConsole,
    logOutputChannel: opts.logOutputChannel
  });

  logLoggerDetails({
    logger: extensionLogger,
    logPath: opts.logPath,
    logLevel: logLevelSetting
  });

  listenToLogSettingsChanges({
    subscriptions: opts.subscriptions,
    onDidChangeConfiguration: opts.onDidChangeConfiguration,
    getConfiguration: opts.getConfiguration,
    loggingLevelProp: opts.loggingLevelProp,
    sourceLocationProp: opts.sourceLocationProp,
    logger: extensionLogger,
    logPath: opts.logPath
  });

  return extensionLogger;
}
