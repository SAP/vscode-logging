class VSCodeStub {
  constructor() {
    this.channelName = undefined;
    this.lines = [];
    this.shown = false;

    const that = this;
    this.window = {
      createOutputChannel(extName) {
        that.channelName = extName;
        return {
          dispose: () => {},
          show: () => {
            that.shown = true;
          },
          appendLine: txt => {
            that.lines.push(txt);
          }
        };
      }
    };
  }
}

module.exports = {
  VSCodeStub: VSCodeStub
};
