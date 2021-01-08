/**
 * This file manages the logger's state.
 */
import { IChildLogger, IVSCodeExtLogger } from "@vscode-logging/types";
import { NOOP_LOGGER } from "@vscode-logging/wrapper";

// On file load we initialize our logger to `NOOP_LOGGER`
// this is done because the "real" logger cannot be initialized during file load.
// only once the `activate` function has been called in extension.ts
// as the `ExtensionContext` argument to `activate` contains the required `logPath`
let loggerImpel: IVSCodeExtLogger = NOOP_LOGGER;

export function getLogger(): IChildLogger {
  return loggerImpel;
}

export function setLogger(newLogger: IVSCodeExtLogger): void {
  loggerImpel = newLogger;
}
