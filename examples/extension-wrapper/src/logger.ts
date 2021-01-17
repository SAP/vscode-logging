/**
 * This file manages the logger's state.
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { ok } from "assert";
import { ExtensionContext, window, workspace } from "vscode";
import { IChildLogger, IVSCodeExtLogger } from "@vscode-logging/types";
import { configureLogger, NOOP_LOGGER } from "@vscode-logging/wrapper";

// On file load we initialize our logger to `NOOP_LOGGER`
// this is done because the "real" logger cannot be initialized during file load.
// only once the `activate` function has been called in extension.ts
// as the `ExtensionContext` argument to `activate` contains the required `logPath`
let loggerImpel: IVSCodeExtLogger = NOOP_LOGGER;

export function getLogger(): IChildLogger {
  return loggerImpel;
}

function setLogger(newLogger: IVSCodeExtLogger): void {
  loggerImpel = newLogger;
}

const LOGGING_LEVEL_PROP = "Example_Logging.loggingLevel";
const SOURCE_LOCATION_PROP = "Example_Logging.sourceLocationTracking";

export function initLogger(context: ExtensionContext): void {
  const meta = JSON.parse(
    readFileSync(resolve(context.extensionPath, "package.json"), "utf8")
  );

  // By asserting the existence of the properties in the package.json
  // at runtime, we avoid many copy-pasta mistakes...
  const configProps = meta?.contributes?.configuration?.properties;
  ok(configProps?.[LOGGING_LEVEL_PROP]);
  ok(configProps?.[SOURCE_LOCATION_PROP]);

  const extLogger = configureLogger({
    extName: meta.displayName,
    logPath: context.logPath,
    logOutputChannel: window.createOutputChannel(meta.displayName),
    // set to `true` if you also want your VSCode extension to log to the console.
    logConsole: false,
    loggingLevelProp: LOGGING_LEVEL_PROP,
    sourceLocationProp: SOURCE_LOCATION_PROP,
    subscriptions: context.subscriptions,
    onDidChangeConfiguration: workspace.onDidChangeConfiguration,
    getConfiguration: workspace.getConfiguration
  });

  setLogger(extLogger);
}
