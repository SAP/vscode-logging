/**
 * Get A Root VSCode Extension Logger capable of Logging to:
 * - Rolling Log File (optional)
 * - VSCode OutputChannel
 */
import { IVSCodeExtLogger, LogLevel } from "@vscode-logging/types";
export {
  IVSCodeExtLogger,
  IChildLogger,
  LogLevel
} from "@vscode-logging/types";

/**
 * This is a sub-type of VSCode.OutputChannel.
 * We define it to avoid direct dependency to @vscode/types.
 * In some edge cases having multiple versions of @vscode/types can cause compilation errors.
 */
export type BasicOutputChannel = {
  appendLine(value: string): void;
  show(): void;
  dispose(): void;
};

export function getExtensionLogger(
  opts: getExtensionLoggerOpts
): IVSCodeExtLogger;

export type getExtensionLoggerOpts = {
  /**
   * This parameter will be used for two things:
   *
   *
   * - Root Label used when creating log entries.
   *   This will also be used as the prefix label for any childLogger e.g:
   *   - "Root.child"
   *   - "Root.child.grandChild"
   */
  extName: string;
  /**
   * The Initial Log Level to use.
   * This should normally provided by a configuration setting exposed to the Extension's end-users.
   * - See: https://github.com/SAP/vscode-logging/tree/master/examples/extension for a runnable example
   *        exposing logging configuration to the end user.
   */
  level: LogLevel;
  /**
   * Optional directory where the rolling log files should be kept.
   * If this is not passed no rolling File Logs will be used.
   *
   * If the directory does not exist it would be created.
   *
   * It is normally expected to send the `ExtensionContext.logPath` in the parameter,
   *   - https://code.visualstudio.com/api/references/vscode-api#ExtensionContext.logPath
   * which means `getExtensionLogger` should be called from the Extension's main `activate` function.
   * - https://code.visualstudio.com/api/references/activation-events#Start-up
   */
  logPath?: string;
  /**
   * Flag for adding sourceLocation information to each logEntry.
   * This is disabled by default and should only be enabled during debugging flows as it
   * Will likely cause significant performance regressions in productive flows.
   */
  sourceLocationTracking?: boolean;
  /**
   * Optional Output channel where the logs should be shown.
   * If this is not passed no Output channel will be used.
   */
  logOutputChannel?: BasicOutputChannel;
  /**
   * Optional Console output channel, if set to true the log message will be printed to the Console output stream (stdout/stderr in Linux)
   * Error and Fatal messages are printed to the standard error console
   * Warn, Info, Debug and Trace are printed to the standard output console
   * Default = false
   */
  logConsole?: boolean;
};
