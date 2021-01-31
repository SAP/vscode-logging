import { ExtensionContext, commands, window } from "vscode";
import { getLogger } from "./logger";

export function registerCommands(
  subscriptions: ExtensionContext["subscriptions"]
): void {
  let logMessagesCounter = 1;
  const commandSubscription = commands.registerCommand(
    "extension.helloWorld",
    // By providing a real function name rather then a `fat arrow` ( ()=>{} )
    // The `sourceLocationTracking` can provide a meaningful output.
    function registerCallback() {
      window.showInformationMessage("Hello Cruel World!");
      getLogger().error(
        `Hip Hip Hurray, the <Hello World> Command was executed! counter: <${logMessagesCounter++}>`
      );
    }
  );
  subscriptions.push(commandSubscription);
}
