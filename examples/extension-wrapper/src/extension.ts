import { ExtensionContext } from "vscode";
import { getLogger, initLogger } from "./logger";
import { registerCommands } from "./commands";

export function activate(context: ExtensionContext): void {
  initLogger(context);
  getLogger().info("extension is active, hip hip hurray!");
  registerCommands(context.subscriptions);
}
