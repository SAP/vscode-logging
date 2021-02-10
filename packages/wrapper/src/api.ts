/**
 * This is the only file in the `src` folder we import("vscode")
 * The rest of the code is implemented with Dependency Injection to
 * the relevant VSCode APIs to enable easier testing.
 */
import { workspace } from "vscode";
import { configureLoggerInternal } from "./configure-logger";
import { BasicOutputChannel } from "@vscode-logging/logger";
export { NOOP_LOGGER } from "./noop-logger";

export function configureLogger(opts: {
  extName: string;
  logPath: string;
  loggingLevelProp: string;
  sourceLocationProp: string;
  logOutputChannel?: BasicOutputChannel;
  logConsole?: boolean;
  subscriptions: { dispose(): any }[];
}) {
  return configureLoggerInternal({
    ...opts,
    getConfiguration: workspace.getConfiguration,
    onDidChangeConfiguration: workspace.onDidChangeConfiguration
  });
}
