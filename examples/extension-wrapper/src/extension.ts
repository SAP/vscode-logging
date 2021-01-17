import { readFileSync } from "fs";
import { resolve } from "path";
import { ok } from "assert";
import { ExtensionContext, window, workspace } from "vscode";
import { configureLogger } from "@vscode-logging/wrapper";
import { getLogger, setLogger } from "./logger";
import { registerCommands } from "./commands";

const LOGGING_LEVEL_PROP = "Example_Logging.loggingLevel";
const SOURCE_LOCATION_PROP = "Example_Logging.sourceLocationTracking";

function initLogger(context: ExtensionContext): void {
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

  registerCommands(context.subscriptions);
}

export function activate(context: ExtensionContext): void {
  initLogger(context);
  getLogger().info("extension is active, hip hip hurray!");
}
