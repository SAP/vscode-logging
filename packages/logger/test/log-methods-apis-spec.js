const { map } = require("lodash");
const { expect } = require("chai");
const proxyquire = require("proxyquire").noCallThru();

const { VSCodeStub } = require("./stubs/vscode-stub");

describe("VSCode Extension extLogger", () => {
  context("Log Methods APIs and Argument Types", () => {
    /**
     * @type {typeof import("../api").getExtensionLogger}output
     */
    let getExtensionLogger;
    let vsCodeStub;
    beforeEach(() => {
      // VSCode outChannel is always enabled so we still need a stub for it
      // even if we are only interested in the rolling File extLogger
      vsCodeStub = new VSCodeStub();
      const mainModuleStubbed = proxyquire("../lib/api.js", {
        vscode: vsCodeStub
      });
      getExtensionLogger = mainModuleStubbed.getExtensionLogger;
    });

    it("supports splat arguments", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "error"
      });

      extLogger.fatal("hello %s and 1 + %i equals 2", "world", 1);
      const logEntries = map(vsCodeStub.lines, JSON.parse);
      expect(logEntries[0].message).to.equal("hello world and 1 + 1 equals 2");
    });

    it("supports metadata object arguments", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "error"
      });

      extLogger.fatal("hello world", { a: 666, b: "oops" }, { c: 333 });
      const logEntries = map(vsCodeStub.lines, JSON.parse);
      expect(logEntries[0].a).to.equal(666);
      expect(logEntries[0].b).to.equal("oops");
      expect(logEntries[0].c).to.equal(333);
    });

    it("supports combining splat and object arguments", () => {
      const extLogger = getExtensionLogger({
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "error"
      });

      extLogger.fatal("hello %s", "world", { a: 666, b: "oops" }, { c: 333 });
      const logEntries = map(vsCodeStub.lines, JSON.parse);
      expect(logEntries[0].message).to.equal("hello world");
      expect(logEntries[0].a).to.equal(666);
      expect(logEntries[0].b).to.equal("oops");
      expect(logEntries[0].c).to.equal(333);
    });
  });
});
