import { LogLevel } from "@vscode-logging/logger";
import { GetLoggingLevelOpts, GetSourceLocationOpts } from "./helper-types";

export function getLoggingLevelSetting(opts: GetLoggingLevelOpts): LogLevel {
  return opts.getConfiguration().get(opts.loggingLevelProp, "error");
}

export function getSourceLocationTrackingSetting(
  opts: GetSourceLocationOpts
): boolean {
  return opts.getConfiguration().get(opts.sourceLocationProp, false);
}
