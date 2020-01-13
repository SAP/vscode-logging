/**
 * A Simple Wrapper to hold the state of our "singleton" (per extension) IVSCodeExtLogger
 * implementation.
 */

/**
 * @type {IVSCodeExtLogger}
 */
let _logger;
let isInitialized = false;

/**
 * Note the use of a getter function so the value would be lazy resolved on each use.
 * This enables concise and simple consumption of the Logger throughout our Extension.
 *
 * @returns { IVSCodeExtLogger }
 */
function getLogger() {
  if (!isInitialized) {
    throw Error("Logger has not yet been initialized!");
  }
  return _logger;
}

/**
 * This function should be invoked after the Logger has been initialized in the Extension's `activate` function.
 * @param {IVSCodeExtLogger} newLogger
 */
function initLogger(newLogger) {
  isInitialized = true;
  _logger = newLogger;
}

module.exports = {
  getLogger,
  initLogger
};
