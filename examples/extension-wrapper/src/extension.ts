import { ExtensionContext } from "vscode";
import { getLogger, initLogger } from "./logger";
import { registerCommands } from "./commands";

export async function activate(context: ExtensionContext): Promise<void> {
  await initLogger(context);
  registerCommands(context.subscriptions);
  getLogger().info("extension is active, hip hip hurray!");
}
