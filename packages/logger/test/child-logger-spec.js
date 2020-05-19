const { map } = require("lodash");
const { expect } = require("chai");
const proxyquire = require("proxyquire").noCallThru();

const { VSCodeStub } = require("./stubs/vscode-stub");
const { resolve } = require("path");
const TESTS_LOG_PATH = resolve(__dirname, ".log-out");

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

  context("childLogger load", () => {
    /**
     * @type {typeof import("../api").getExtensionLogger}
     */
    let getExtensionLogger;
    let vsCodeStub;
    beforeEach(() => {
      const mainModuleStubbed = proxyquire("../lib/api.js", {});
      getExtensionLogger = mainModuleStubbed.getExtensionLogger;
    });

    function createExtLoggerWithNumberOfChildLoggers(childLoggersNumbers) {
      const extLogger = getExtensionLogger({
        extName: "MainLoggerExtension",
        logPath: TESTS_LOG_PATH,
        level: "error"
      });

      for (
        let childLoggerNumber = 1;
        childLoggerNumber <= childLoggersNumbers;
        childLoggerNumber++
      ) {
        extLogger.getChildLogger({
          label: "ChildLoggerClass" + childLoggerNumber
        });
      }
    }

    /**
     * Issue #76 reproduction.
     *
     * The issue is reproducible
     * when running "yarn ci" in the home directory vscode-logging
     * with only on this it, context or describe;
     * or when running "yarn test" in vscode-logging/packages/logger folder.
     *
     * The following errors appeared before fixing Issue #76 after the successful test result:
     childLogger load
     √ will create 9 childLoggers and write error message to stderr
     (node:2280) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 unpipe listeners added to [RollingFileTransport]. Use emitter.setMaxListeners() to increase limit
     (node:2280) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 error listeners added to [RollingFileTransport]. Use emitter.setMaxListeners() to increase limit
     */
    it("will create 9 childLoggers and write error message to stderr (before fixing Issue #76)", () => {
      return createExtLoggerWithNumberOfChildLoggers(9);
    });

    /**
     * Issue #76 doesn't happen when the number of ChildLogger's is less than 9.
     *
     * No errors appear after the successful test result:
     childLogger load
     √ will create 8 childLoggers and no error message to stderr
     */
    it("will create 8 childLoggers and no error message to stderr (before fixing Issue #76)", () => {
      return createExtLoggerWithNumberOfChildLoggers(8);
    });
  });
  context(
    "childLogger will log to childLogger log entry with correct label",
    () => {
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

      it("in fatal log message for extension class", () => {
        const extLogger = getExtensionLogger({
          extName: "MyExtName",
          logOutputChannel: vsCodeStub.OutputChannel,
          level: "trace"
        });

        const classLogger = extLogger.getChildLogger({ label: "myClassName" });
        classLogger.fatal("Oops I did it again!");

        const logEntries = map(vsCodeStub.lines, JSON.parse);
        expect(logEntries)
          .excluding("time")
          .to.deep.eql([
            {
              label: "MyExtName.myClassName",
              level: "fatal",
              message: "Oops I did it again!"
            }
          ]);
      });

      it("in error log message for extension library class", () => {
        const extLogger = getExtensionLogger({
          extName: "MyExtName",
          logOutputChannel: vsCodeStub.OutputChannel,
          level: "trace"
        });

        const libLogger = extLogger.getChildLogger({ label: "myLibName" });
        const classLogger = libLogger.getChildLogger({ label: "myClassName" });
        classLogger.error("Oops I did it again!");

        const logEntries = map(vsCodeStub.lines, JSON.parse);
        expect(logEntries)
          .excluding("time")
          .to.deep.eql([
            {
              label: "MyExtName.myLibName.myClassName",
              level: "error",
              message: "Oops I did it again!"
            }
          ]);
      });

      it("in warn log message for extension internal library class", () => {
        const extLogger = getExtensionLogger({
          extName: "MyExtName",
          logOutputChannel: vsCodeStub.OutputChannel,
          level: "trace"
        });

        const lib1Logger = extLogger.getChildLogger({ label: "myLib1Name" });
        const lib2Logger = lib1Logger.getChildLogger({ label: "myLib2Name" });
        const classLogger = lib2Logger.getChildLogger({ label: "myClassName" });
        classLogger.warn("Oops I did it again!");

        const logEntries = map(vsCodeStub.lines, JSON.parse);
        expect(logEntries)
          .excluding("time")
          .to.deep.eql([
            {
              label: "MyExtName.myLib1Name.myLib2Name.myClassName",
              level: "warn",
              message: "Oops I did it again!"
            }
          ]);
      });

      it("in info log message for extension internal library class", () => {
        const extLogger = getExtensionLogger({
          extName: "MyExtName",
          logOutputChannel: vsCodeStub.OutputChannel,
          level: "trace"
        });

        const lib1Logger = extLogger.getChildLogger({ label: "myLib1Name" });
        const lib2Logger = lib1Logger.getChildLogger({ label: "myLib2Name" });
        const lib3Logger = lib2Logger.getChildLogger({ label: "myLib3Name" });
        const classLogger = lib3Logger.getChildLogger({ label: "myClassName" });
        classLogger.info("Oops I did it again!");

        const logEntries = map(vsCodeStub.lines, JSON.parse);
        expect(logEntries)
          .excluding("time")
          .to.deep.eql([
            {
              label: "MyExtName.myLib1Name.myLib2Name.myLib3Name.myClassName",
              level: "info",
              message: "Oops I did it again!"
            }
          ]);
      });
      it("in debug log message for extension internal library class", () => {
        const extLogger = getExtensionLogger({
          extName: "MyExtName",
          logOutputChannel: vsCodeStub.OutputChannel,
          level: "trace"
        });

        const lib1Logger = extLogger.getChildLogger({ label: "myLib1Name" });
        const lib2Logger = lib1Logger.getChildLogger({ label: "myLib2Name" });
        const lib3Logger = lib2Logger.getChildLogger({ label: "myLib3Name" });
        const lib4Logger = lib3Logger.getChildLogger({ label: "myLib4Name" });
        const classLogger = lib4Logger.getChildLogger({ label: "myClassName" });
        classLogger.debug("Oops I did it again!");

        const logEntries = map(vsCodeStub.lines, JSON.parse);
        expect(logEntries)
          .excluding("time")
          .to.deep.eql([
            {
              label:
                "MyExtName.myLib1Name.myLib2Name.myLib3Name.myLib4Name.myClassName",
              level: "debug",
              message: "Oops I did it again!"
            }
          ]);
      });
      it("in trace log message for extension internal library class", () => {
        const extLogger = getExtensionLogger({
          extName: "MyExtName",
          logOutputChannel: vsCodeStub.OutputChannel,
          level: "trace"
        });

        const lib1Logger = extLogger.getChildLogger({ label: "myLib1Name" });
        const lib2Logger = lib1Logger.getChildLogger({ label: "myLib2Name" });
        const lib3Logger = lib2Logger.getChildLogger({ label: "myLib3Name" });
        const lib4Logger = lib3Logger.getChildLogger({ label: "myLib4Name" });
        const lib5Logger = lib4Logger.getChildLogger({ label: "myLib5Name" });
        const classLogger = lib5Logger.getChildLogger({ label: "myClassName" });
        classLogger.trace("Oops I did it again!");

        const logEntries = map(vsCodeStub.lines, JSON.parse);
        expect(logEntries)
          .excluding("time")
          .to.deep.eql([
            {
              label:
                "MyExtName.myLib1Name.myLib2Name.myLib3Name.myLib4Name.myLib5Name.myClassName",
              level: "trace",
              message: "Oops I did it again!"
            }
          ]);
      });
    }
  );
});
