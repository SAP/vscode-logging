const Transport = require("winston-transport");
const { MESSAGE } = require("triple-beam");

class VscodeOutChannelTransport extends Transport {
  /**
   * @param {object} opts
   * @param {import("../../api").BasicOutputChannel} opts.outChannel
   */
  constructor(opts) {
    super();

    this.outChannel = opts.outChannel;
  }

  log(info, cb) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    this.outChannel.appendLine(info[MESSAGE]);

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
    if (this.outChannel === undefined) {
      return;
    }

    this.outChannel.dispose();

    if (cb) {
      cb();
    }
  }
}

module.exports = {
  VscodeOutChannelTransport: VscodeOutChannelTransport
};
