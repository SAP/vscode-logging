type LogLevel = "off" | "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export type getExtensionLoggerOpts = {
  /**
   * Root Label used when creating log entries.
   * This will also be used as the prefix label for any childLogger e.g:
   * - "Root.child"
   * - "Root.child.grandChild"
   */
  extName: string;
  /**
   * The Initial Log Level to use.
   * This should normally provided by a configuration setting exposed to the Extension's end-users.
   * - See the examples directory in the root of this repo.
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
};

interface IVSCodeExtLogger extends IChildLogger {
  /**
   * Modify the Logging Level.
   * This will affect all child loggers as well.
   * Note that the level "off" is used to 'disable' the Logger.
   */
  changeLevel(newLevel: LogLevel): void;

  /**
   * Modify the Log's sourceLocation tracking behavior.
   */
  changeSourceLocationTracking(newSourceLocation: boolean): void;
}

interface IChildLogger {
  /**
   * @param msg - The Message to log, It may include format specifiers as defined in
   *              - https://nodejs.org/api/util.html#util_util_format_format_args
   * @param [args] - Args can be either:
   *                  - Optional Variable Argument List of values to "replace" the format specifiers:
   *                    myLogger.fatal("Oy %s %d", "Vey", 123) // --> { message: "Oy Vey 123"}
   *                  - Metadata Objects:
   *                    myLogger.fatal("Exec Command", { p1: 666, p2: "foo" }) // --> { message: "Exec Command", p1: 666, p2: "foo"}
   *                    Or a combination of both, however note that format specifier values should appear before
   *                    any metadata objects.
   *
   */
  fatal(msg: string, ...args: any[]): void;
  /**
   * @see {IChildLogger.fatal}
   */
  error(msg: string, ...args: any[]): void;
  /**
   * @see {IChildLogger.fatal}
   */
  warn(msg: string, ...args: any[]): void;
  /**
   * @see {IChildLogger.fatal}
   */
  info(msg: string, ...args: any[]): void;
  /**
   * @see {IChildLogger.fatal}
   */
  debug(msg: string, ...args: any[]): void;
  /**
   * @see {IChildLogger.fatal}
   */
  trace(msg: string, ...args: any[]): void;

  /**
   * Will create an logger which uses the **same** log Targets (VSCode outputChannel / Rolling File(?)).
   * With one difference: This "child-logger" will prefix its name to the log entries label property.
   * This enables distinguishing between logging messages arriving from different sources, e.g:
   *
   * - Per Class Logger
   * - Per Module Logger
   * - Per Library Dependency Logger (via dependency injection)
   * - ...
   *
   * Note that the childLoggers are cached using the label as the key, this means that
   * One can safely request a (same label) childLogger **multiple times** and not worry about
   * memory leaks due to the creation of many objects.
   */
  getChildLogger(opts: { label: string }): IChildLogger;
}
