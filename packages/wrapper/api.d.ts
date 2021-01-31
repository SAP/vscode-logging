import { workspace, ExtensionContext } from "vscode";
import { IVSCodeExtLogger } from "@vscode-logging/types";
import { BasicOutputChannel } from "@vscode-logging/logger";

/**
 * An "empty" Logger implementation.
 * This value should be used to initialize an extension's logger
 * before the `activate` function has been called.
 */
export declare const NOOP_LOGGER: IVSCodeExtLogger;

export interface ConfigureLoggerOpts {
  /**
   * @see {GetExtensionLoggerOpts.extName}
   */
  extName: string;
  /**
   * @see {GetExtensionLoggerOpts.logPath}
   */
  logPath: string;
  loggingLevelProp: string;
  sourceLocationProp: string;
  /**
   * @see {GetExtensionLoggerOpts.logOutputChannel}
   */
  logOutputChannel?: BasicOutputChannel;
  /**
   * @see {GetExtensionLoggerOpts.logConsole}
   */
  logConsole?: boolean;
  /**
   * The vscode's extension subscriptions
   * This is normally available via the `activate` function's `context`
   * parameter.
   */
  subscriptions: ExtensionContext["subscriptions"];
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
}

/**
 * The main opinionated wrapper utility.
 * This will do the following:
 *
 * 1. Initialize an @vscode-logging/logger instance.
 * 2. Log the initial file `logPath` and `logLevel`.
 * 3. Register a listener for VSCode workspace configuration changes
 *    for the `logLevel` and `sourceLocationTracking`
 *
 * - Note that this utility is slightly opinionated and has more more restrictive
 *   than the @vscode-logging/logger APIs, e.g:
 *   1. `logPath` param is mandatory.
 *   2. default logLevel (if none is found in the workspace configuration) is `error`.
 *   3. ...
 */
export function configureLogger(opts: ConfigureLoggerOpts): IVSCodeExtLogger;
