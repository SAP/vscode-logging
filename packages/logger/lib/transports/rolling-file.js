const { EOL } = require("os");
const Transport = require("winston-transport");
const { MESSAGE } = require("triple-beam");
const { ensureDirSync } = require("fs-extra");
const { resolve } = require("path");
const { defaults } = require("lodash");

class RollingFileTransport extends Transport {
  /**
   * @param {object} opts
   * @param {*} opts.RollingFileStream
   * @param {string} opts.logPath
   * @param {string} opts.extName
   * @param {string} [opts.maxFiles] - Maximum number of files to roll before overwriting previous logs.
   * @param {string} [opts.maxFileSize] - In MegaByte, total max log size would be in Bytes.
   */
  constructor(opts) {
    super();

    const actualOpts = defaults(opts, {
      maxFiles: 10,
      maxFileSize: 1024 * 1024
    });

    // better safe then sorry
    ensureDirSync(actualOpts.logPath);

    const logFilePath = resolve(
      actualOpts.logPath,
      `${actualOpts.extName}.log`
    );

    this.rollingFileStream = new opts.RollingFileStream(
      logFilePath,
      actualOpts.maxFileSize,
      actualOpts.maxFiles
    );
  }

  log(info, cb) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    this.rollingFileStream.write(info[MESSAGE] + EOL);

    /* istanbul ignore else - winston transports use guard conditions around the callbacks
     *  however I have no idea how to simulate the callback not existing... (winston internals...)
     **/
    if (cb) {
      cb();
    }
  }

  /* istanbul ignore next - Our flows never close a transport, this only happens on exist of VSCode
   *    Probably not worth the effort of mocking this or creating a proper integration test.
   **/
  close(cb) {
    if (this.rollingFileStream === undefined) {
      return;
    }

    this.rollingFileStream.end(() => {
      if (cb) {
        cb();
      }
      this.emit("flush");
      this.emit("closed");
    });
  }
}

module.exports = {
  RollingFileTransport: RollingFileTransport
};
