import { ExtensionContext, window, workspace } from "vscode";
import { readFileSync } from "fs";
import { resolve } from "path";
import { configureLogger } from "@vscode-logging/wrapper";
import { getLogger, setLogger } from "./logger";
import { registerCommands } from "./commands";

// TODO: assert these actually do exist.
const LOGGING_LEVEL_PROP = "Example_Logging.loggingLevel";
const SOURCE_LOCATION_PROP = "Example_Logging.sourceLocationTracking";

function initLogger(context: ExtensionContext): void {
  const meta = JSON.parse(
    readFileSync(resolve(context.extensionPath, "package.json"), "utf8")
  );

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
