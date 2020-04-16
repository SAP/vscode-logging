const { map } = require("lodash");
const { expect } = require("chai");
const proxyquire = require("proxyquire").noCallThru();

const { VSCodeStub } = require("./stubs/vscode-stub");

describe("VSCode Extension Logger", () => {
  context("childLogger capabilities", () => {
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

    it("will log to childLogger", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "error"
      });

      const childLogger = extLogger.getChildLogger({ label: "myLibName" });
      childLogger.fatal("Oops I did it again!");

      const logEntries = map(vsCodeStub.lines, JSON.parse);
      expect(logEntries)
        .excluding("time")
        .to.deep.eql([
          {
            label: "MyExtName.myLibName",
            level: "fatal",
            message: "Oops I did it again!"
          }
        ]);
    });

    it("will handle logging level at the root Logger of all childLoggers", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "error"
      });

      const childLogger = extLogger.getChildLogger({ label: "myLibName" });
      childLogger.warn("Oops I did it again!");
      // nothing logged, warn < 'error'
      expect(vsCodeStub.lines).to.be.empty;

      extLogger.changeLevel("info");

      // Changes on the root affected the level of the child...
      childLogger.warn("Oops I did it again!");
      const logEntries = map(vsCodeStub.lines, JSON.parse);
      expect(logEntries)
        .excluding("time")
        .to.deep.eql([
          {
            label: "MyExtName.myLibName",
            level: "warn",
            message: "Oops I did it again!"
          }
        ]);
    });

    it("will handle sourceLocationTracking option at the root Logger of all childLoggers", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "info"
      });

      const childLogger = extLogger.getChildLogger({ label: "myLibName" });
      const grandChildLogger = childLogger.getChildLogger({
        label: "myClassName"
      });

      childLogger.warn("Oops I did it again!");
      grandChildLogger.warn("Oops I did it again!");
      const logEntriesBefore = map(vsCodeStub.lines, JSON.parse);
      expect(logEntriesBefore[0]).to.not.have.property("source");
      expect(logEntriesBefore[1]).to.not.have.property("source");

      // Change at the root Logger Source Location
      extLogger.changeSourceLocationTracking(true);
      vsCodeStub.lines = [];
      childLogger.warn("Oops I did it again!");
      grandChildLogger.warn("Oops I did it again!");

      const logEntriesAfter = map(vsCodeStub.lines, JSON.parse);
      expect(logEntriesAfter[0]).to.have.property("source");
      expect(logEntriesAfter[1]).to.have.property("source");
    });

    it("will cache and re-use the same childLogger for the same label", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logOutputChannel: vsCodeStub.OutputChannel,
        level: "error"
      });

      const childLogger = extLogger.getChildLogger({ label: "myLibName" });
      const childLoggerSameLabel = extLogger.getChildLogger({
        label: "myLibName"
      });
      expect(childLogger).to.equal(childLoggerSameLabel);
    });
  });
});
