const { has } = require("lodash");
const { createLogger } = require("winston");
/**
 * Normally we would prefer to depend upon `vscode` and `streamroller` inside their respective transports.
 * However, by depending on those here in `api.js` we are able to more easily mock/stub these
 * using proxyQuire.
 *
 * This is the lesser evil as the other options of:
 *  - Using `@global` with proxyQuire.
 *  - Running fuller (much more copmlex) integration tests with a real VSCode and real files.
 *
 *  Seem much worse.
 */
const { RollingFileStream } = require("streamroller");

const { buildLoggerFormat } = require("./format");
const { VSCodeExtLogger } = require("./logger");
const {
  VscodeOutChannelTransport
} = require("./transports/vscode-out-channel");
const { RollingFileTransport } = require("./transports/rolling-file");
const { levelsConfig, isValidLogLevel, levels } = require("./levels");
const { ConsoleTransport } = require("./transports/console-output");

/**
 * @param {import("../api").getExtensionLoggerOpts} opts
 * @return {import("@vscode-logging/types").IVSCodeExtLogger}
 */
function getExtensionLogger(opts) {
  if (isValidLogLevel(opts.level) === false) {
    throw Error(`Attempt to use unknown logging level: <${opts.level}>!`);
  }

  if (
    !has(opts, "logOutputChannel") &&
    !has(opts, "logPath") &&
    !has(opts, "logConsole")
  ) {
    throw Error(
      "Logger must have at least one logging target defined, it should includes one (or more) of these options: logOutputChannel, logPath and logConsole"
    );
  }

  /**
   * @type {any[]}
   */
  const transports = [];

  if (opts.logConsole) {
    transports.push(new ConsoleTransport());
  }

  if (opts.logOutputChannel) {
    transports.push(
      new VscodeOutChannelTransport({
        outChannel: opts.logOutputChannel
      })
    );
  }

  if (opts.logPath) {
    transports.push(
      new RollingFileTransport({
        logPath: opts.logPath,
        extName: opts.extName,
        RollingFileStream: RollingFileStream
      })
    );
  }

  const format = buildLoggerFormat(opts.extName);
  const rootWinstonLogger = createLogger({
    levels: levelsConfig,
    // We are handling the log levels ourselves, to avoid calling winston's re-configure method
    // as it would require us to re-create the winston transports and may create race conditions
    // - Winston does not have a minimal API to change **only** the level...
    level: levels.trace,
    format: format,
    transports: transports
  });

  return new VSCodeExtLogger({
    label: opts.extName,
    level: opts.level,
    loggerImpel: rootWinstonLogger,
    outChannel: opts.logOutputChannel,
    sourceLocationTracking: opts.sourceLocationTracking,
    consoleOutput: opts.logConsole
  });
}

/**
 * Ensure actual runtime API matches the declared public API
 * @type {typeof import("../api")}
 */
const publicApi = {
  getExtensionLogger: getExtensionLogger
};

module.exports = publicApi;
