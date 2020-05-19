const { Calculator } = require("@vscode-logging/library-example");

// Our modules consume the logger via the logger-wrapper module
const { getLogger } = require("./logger-wrapper");

function callLibraryAndPassLogger() {
  // Using a childLogger will add a suffix to the `namespace` information in each logEntry.
  const calculatorChildLogger = getLogger().getChildLogger({
    label: "Calculator"
  });

  const calc = new Calculator(calculatorChildLogger);

  // These methods will now log the same log targets as our VSCode Extension Logger (OutChannel / Rolling File)
  calc.add(1, 2);
  calc.subtract(5, 3);
  calc.multiply(2, 6);
}

module.exports = {
  callLibraryAndPassLogger
};
