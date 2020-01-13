const NO_OPERATION = () => {};

/**
 * Empty Implementation of the Logger in case none is provided via Dependency Injection.
 * An alternative implementation could log to the console or provide another (real) implementation.
 *
 * @type {IChildLogger}
 */
const noopLogger = {
  fatal: NO_OPERATION,
  error: NO_OPERATION,
  warn: NO_OPERATION,
  info: NO_OPERATION,
  debug: NO_OPERATION,
  trace: NO_OPERATION,
  getChildLogger: function(opts) {
    return noopLogger;
  }
};

class Calculator {
  /**
   * @param {IChildLogger} [logger]
   */
  constructor(logger = noopLogger) {
    this.logger = logger;
  }

  subtract(lhs, rhs) {
    // Adding Metadata Objects to the JSON structured log entry.
    this.logger.info("Subtract called with arguments:", { lhs: lhs, rhs: rhs });
    return lhs - rhs;
  }

  add(lhs, rhs) {
    // Using ECMAScript Template Literals to construct the message (Recommended!)
    // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    this.logger.warn(`add called with arguments: <${lhs}> + <${rhs}>`);
    return lhs + rhs;
  }

  multiply(lhs, rhs) {
    // using splat style to construct the message
    this.logger.error("multiple called with arguments: <%d> + <%d>", lhs, rhs);
    return lhs * rhs;
  }
}

module.exports = {
  Calculator: Calculator
};
