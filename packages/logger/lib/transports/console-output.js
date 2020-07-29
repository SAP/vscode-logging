const Transport = require("winston-transport");
const { LEVEL, MESSAGE } = require("triple-beam");

class ConsoleTransport extends Transport {
  constructor() {
    super();
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info
   * @param {Function} callback
   */
  log(info, callback) {
    setImmediate(() => this.emit("logged", info));

    switch (info[LEVEL]) {
      case "error":
      case "fatal":
        console.error(info[MESSAGE]);
        break;
      case "warn":
        console.warn(info[MESSAGE]);
        break;
      default:
        console.log(info[MESSAGE]);
    }
    /* istanbul ignore else - winston transports use guard conditions around the callbacks
     *  however I have no idea how to simulate the callback not existing... (winston internals...)
     **/
    if (callback) {
      callback(); // eslint-disable-line callback-return
    }
  }
}

module.exports = {
  ConsoleTransport: ConsoleTransport
};
