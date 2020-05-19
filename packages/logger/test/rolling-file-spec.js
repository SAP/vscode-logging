const { map } = require("lodash");
const { expect } = require("chai");
const proxyquire = require("proxyquire").noCallThru();
const { basename, resolve } = require("path");

const { StreamRollerStub } = require("./stubs/stream-roller-stub");

const TESTS_LOG_PATH = resolve(__dirname, ".log-out");

describe("VSCode Extension Logger", () => {
  /**
   * We are not testing the behavior of the StreamRoller, that is not our responsibility...
   * Rather we are only inspecting what gets written to the stream.
   */
  context("Rolling File Logging", () => {
    /**
     * @type {typeof import("../api").getExtensionLogger}
     */
    let getExtensionLogger;
    let streamRollerStub;
    beforeEach(() => {
      streamRollerStub = new StreamRollerStub();
      const mainModuleStubbed = proxyquire("../lib/api.js", {
        streamroller: streamRollerStub
      });
      getExtensionLogger = mainModuleStubbed.getExtensionLogger;
    });

    it("will Log in JSON Format", () => {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logPath: TESTS_LOG_PATH,
        level: "error"
      });
      extLogger.fatal("Oy Vey!");
      extLogger.error("Oh Dear...");

      const logEntries = map(streamRollerStub.lines, JSON.parse);
      expect(logEntries)
        .excluding("time")
        .to.deep.eql([
          {
            label: "MyExtName",
            level: "fatal",
            message: "Oy Vey!",
            namespace: "MyExtName"
          },
          {
            label: "MyExtName",
            level: "error",
            message: "Oh Dear...",
            namespace: "MyExtName"
          }
        ]);
    });

    it("can add sourceLocation information", function myFuncName() {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        sourceLocationTracking: true,
        logPath: TESTS_LOG_PATH,
        level: "error"
      });
      extLogger.fatal("Oy Vey!");
      const logEntries = map(streamRollerStub.lines, JSON.parse);
      // [0] contains the warning about using `sourceLocationTracking`
      const logJsonEntry = logEntries[1];
      expect(logJsonEntry.label).to.eql("MyExtName");
      expect(logJsonEntry.level).to.eql("fatal");
      expect(logJsonEntry.message).to.eql("Oy Vey!");
      expect(logJsonEntry.source.function).to.eql("Context.myFuncName");
      const baseFileName = basename(__filename);
      const fileNameAndLocRegExp = new RegExp(`.+${baseFileName}:\\d+:\\d+`);
      // The location includes our own source file name! :)
      expect(logJsonEntry.source.location).to.match(fileNameAndLocRegExp);
    });
  });
});
