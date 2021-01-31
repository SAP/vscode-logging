import { LogLevel } from "@vscode-logging/types";
import { ListenToLogSettingsOpts, LogLoggerDetailsOpts } from "./helper-types";
import {
  getLoggingLevelSetting,
  getSourceLocationTrackingSetting
} from "./settings";

export function logLoggerDetails(opts: LogLoggerDetailsOpts): void {
  opts.logger.info(`Start Logging in Log Level: <${opts.logLevel}>`);
  opts.logger.info(`Full Logs can be found in the <${opts.logPath}> folder.`);
}

export function listenToLogSettingsChanges(
  opts: ListenToLogSettingsOpts
): void {
  opts.subscriptions.push(
    opts.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(opts.loggingLevelProp)) {
        const logLevel: LogLevel = getLoggingLevelSetting({
          loggingLevelProp: opts.loggingLevelProp,
          getConfiguration: opts.getConfiguration
        });
        opts.logger.changeLevel(logLevel);
        logLoggerDetails({
          logger: opts.logger,
          logPath: opts.logPath,
          logLevel
        });
      }
    })
  );

  opts.subscriptions.push(
    opts.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(opts.sourceLocationProp)) {
        const newSourceLocationTracking: boolean = getSourceLocationTrackingSetting(
          {
            sourceLocationProp: opts.sourceLocationProp,
            getConfiguration: opts.getConfiguration
          }
        );
        opts.logger.changeSourceLocationTracking(newSourceLocationTracking);
      }
    })
  );
}
