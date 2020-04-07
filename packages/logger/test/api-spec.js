const { expect } = require("chai");
const proxyquire = require("proxyquire").noCallThru();

const { levels, levelsConfig } = require("../lib/levels");
const { VSCodeStub } = require("./stubs/vscode-stub");

describe("VSCode Extension Logger", () => {
  /**
   * @type {typeof import("../api").getExtensionLogger}
   */
  let getExtensionLogger;
  let vsCodeStub;
  beforeEach(() => {
    // VSCode outChannel is optional but we still need a stub for it
    // in order to test its functionality
    vsCodeStub = new VSCodeStub();
    const mainModuleStubbed = proxyquire("../lib/api.js", {
      vscode: vsCodeStub
    });
    getExtensionLogger = mainModuleStubbed.getExtensionLogger;
  });

  context("when receiving no OutputChannel and no logPath", () => {
    it("will throw on invalid/missing parameters", () => {
      expect(() => {
        getExtensionLogger({
          extName: "MyExtName",
          level: "error"
        });
      }).to.throw("Should have at least one: logOutputChannel or logPath");
    });
  });
});
