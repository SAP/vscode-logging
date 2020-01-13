const vscode = require("vscode");

// Our modules consume the logger via the logger-wrapper module
const { getLogger } = require("./logger-wrapper");

/**
 *
 * @param {vscode.ExtensionContext} context
 */
function registerCommands(context) {
  let logMessagesCounter = 1;
  const commandSubscription = vscode.commands.registerCommand(
    "extension.helloWorld",
    // By providing a real function name rather then a `fat arrow` ( ()=>{} )
    // The `sourceLocationTracking` can provide a meaningful output.
    function registerCallback() {
      vscode.window.showInformationMessage("Hello Cruel World!");
      getLogger().error(
        `Hip Hip Hurray, the <Hello World> Command was executed! counter: <${logMessagesCounter++}>`
      );
    }
  );
  context.subscriptions.push(commandSubscription);
}

module.exports = {
  registerCommands: registerCommands
};
