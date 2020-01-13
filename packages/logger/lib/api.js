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
const { window } = require("vscode");
const { RollingFileStream } = require("streamroller");

const { buildLoggerFormat } = require("./format");
const { VSCodeExtLogger } = require("./logger");
const {
  VscodeOutChannelTransport
} = require("./transports/vscode-out-channel");
const { RollingFileTransport } = require("./transports/rolling-file");
const { levelsConfig, isValidLogLevel, levels } = require("./levels");

/**
 * @param {import("../api").getExtensionLoggerOpts} opts
 * @return {import("@vscode-logging/types").IVSCodeExtLogger}
 */
function getExtensionLogger(opts) {
  if (isValidLogLevel(opts.level) === false) {
    throw Error(`Attempt to use unknown logging level: <${opts.level}>!`);
  }

  // We are creating the output channel here because we also need a reference to it in the
  // VSCodeExtLogger instance.
  const outChannel = window.createOutputChannel(opts.extName);
  /**
   * @type {any[]}
   */
  const transports = [
    new VscodeOutChannelTransport({
      outChannel: outChannel
    })
  ];

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

  const extLogger = new VSCodeExtLogger({
    label: opts.extName,
    level: opts.level,
    sourceLocationTracking: opts.sourceLocationTracking,
    outChannel: outChannel,
    loggerImpel: rootWinstonLogger
  });

  return extLogger;
}

/**
 * Ensure actual runtime API matches the declared public API
 * @type {typeof import("../api")}
 */
const publicApi = {
  getExtensionLogger: getExtensionLogger
};

module.exports = publicApi;
