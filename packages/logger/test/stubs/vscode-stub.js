class VSCodeStub {
  constructor() {
    this.lines = [];
    this.shown = false;

    const that = this;
    this.OutputChannel = {
      dispose: () => {},
      show: () => {
        that.shown = true;
      },
      appendLine: txt => {
        that.lines.push(txt);
      }
    };
  }
}

module.exports = {
  VSCodeStub: VSCodeStub
};
