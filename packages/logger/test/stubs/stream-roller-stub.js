class StreamRollerStub {
  constructor() {
    this.lines = [];
    const that = this;

    this.RollingFileStream = class RollingFileStreamStub {
      constructor() {
        that.lines = [];
      }

      write(txt) {
        that.lines.push(txt);
      }

      end() {
        // NOOP
      }
    };
  }
}

module.exports = {
  StreamRollerStub: StreamRollerStub
};
