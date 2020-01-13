const { VSCodeStub } = require("./stubs/vscode-stub");
const { map } = require("lodash");
const { basename } = require("path");

const { expect } = require("chai");
const proxyquire = require("proxyquire").noCallThru();

describe("VSCode Extension Logger", () => {
  context("OutChannel Logging", () => {
    let vsCodeStub;
    /**
     * @type {typeof import("../api").getExtensionLogger}
     */
    let getExtensionLogger;

    beforeEach(() => {
      vsCodeStub = new VSCodeStub();
      const mainModuleStubbed = proxyquire("../lib/api.js", {
        vscode: vsCodeStub
      });
      getExtensionLogger = mainModuleStubbed.getExtensionLogger;
    });

    it("will Log in JSON Format", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        level: "error"
      });
      extLogger.fatal("Oy Vey!");
      extLogger.error("Oh Dear...");

      const logEntries = map(vsCodeStub.lines, JSON.parse);
      expect(logEntries)
        .excluding("time")
        .to.deep.eql([
          {
            label: "MyExtName",
            level: "fatal",
            message: "Oy Vey!"
          },
          {
            label: "MyExtName",
            level: "error",
            message: "Oh Dear..."
          }
        ]);
    });

    it("can add sourceLocation information", function myFuncName() {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        sourceLocationTracking: true,
        level: "error"
      });
      extLogger.fatal("Oh dear");
      const logEntries = map(vsCodeStub.lines, JSON.parse);
      // [0] contains the warning about using `sourceLocationTracking`
      const logJsonEntry = logEntries[1];
      expect(logJsonEntry.label).to.eql("MyExtName");
      expect(logJsonEntry.level).to.eql("fatal");
      expect(logJsonEntry.message).to.eql("Oh dear");
      expect(logJsonEntry.source.function).to.eql("Context.myFuncName");
      const baseFileName = basename(__filename);
      const fileNameAndLocRegExp = new RegExp(`.+${baseFileName}:\\d+:\\d+`);
      // The location includes our own source file name! :)
      expect(logJsonEntry.source.location).to.match(fileNameAndLocRegExp);
    });

    it("will Create an outChannel named after the extension", () => {
      getExtensionLogger({
        extName: "MyExtName",
        level: "error"
      });
      expect(vsCodeStub.channelName).to.equal("MyExtName");
    });

    context(
      "will **show** on the outChannel and log a warning when the sourceLocationTracking is enabled",
      () => {
        it("on initialization", () => {
          getExtensionLogger({
            extName: "MyExtName",
            sourceLocationTracking: true,
            level: "warn"
          });
          expect(vsCodeStub.shown).to.be.true;
        });

        it("on sourceLocationChange change", () => {
          const extLogger = getExtensionLogger({
            extName: "MyExtName",
            level: "error"
          });
          expect(vsCodeStub.shown).to.be.false;
          extLogger.changeSourceLocationTracking(true);
          expect(vsCodeStub.shown).to.be.true;
        });
      }
    );
  });
});
