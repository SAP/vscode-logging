const proxyquire = require("proxyquire").noCallThru();
const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");
const { StreamRollerStub } = require("./stubs/stream-roller-stub");
const { resolve } = require("path");

chai.use(sinonChai);

const expect = chai.expect;

const TESTS_LOG_PATH = resolve(__dirname, ".log-out");

describe("VSCode Extension Logger", function() {
  let vsCodeStub;
  /**
   * @type {typeof import("../api").getExtensionLogger}
   */
  let getExtensionLogger;
  let errSpy, warnSpy, logSpy;
  let streamRollerStub;
  beforeEach(() => {
    streamRollerStub = new StreamRollerStub();
    const mainModuleStubbed = proxyquire("../lib/api.js", {
      streamroller: streamRollerStub
    });
    getExtensionLogger = mainModuleStubbed.getExtensionLogger;
    errSpy = sinon.spy(console, "error");
    warnSpy = sinon.spy(console, "warn");
    logSpy = sinon.spy(console, "log");
  });

  afterEach(function() {
    console.error.restore();
    console.warn.restore();
    console.log.restore();
  });

  describe("Console Logging - check that the output stream match the message type and log level - error/warn/info and stdout/stderr", function() {
    it("should log to console in info level", function() {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        level: "info",
        logConsole: true
      });
      extLogger.fatal("Oy Vey!");
      extLogger.error("Oh Dear...");
      extLogger.info("Oh Wow...");

      sinon.assert.calledTwice(console.error);
      sinon.assert.called(console.log);
      sinon.assert.notCalled(console.warn);
      expect(errSpy.args[0][0]).to.include("Oy Vey!");
      expect(errSpy.args[1][0]).to.include("Oh Dear...");
      expect(logSpy.args[0][0]).to.include("Oh Wow...");
    });

    it("should log to console in error level", function() {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        level: "error",
        logConsole: true
      });
      extLogger.fatal("Oy Vey!");
      extLogger.error("Oh Dear...");
      extLogger.info("Oh Wow...");

      sinon.assert.calledTwice(console.error);
      sinon.assert.notCalled(console.log);
      sinon.assert.notCalled(console.warn);
      expect(errSpy.args[0][0]).to.include("Oy Vey!");
      expect(errSpy.args[1][0]).to.include("Oh Dear...");
    });

    it("should log to console in warn level", function() {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        level: "warn",
        logConsole: true
      });
      extLogger.warn("Oy Might...");
      extLogger.error("Oh Dear...");
      extLogger.info("Oh Wow...");

      sinon.assert.called(console.error);
      sinon.assert.called(console.warn);
      sinon.assert.notCalled(console.log);
      expect(errSpy.args[0][0]).to.include("Oh Dear...");
      expect(warnSpy.args[0][0]).to.include("Oy Might...");
    });

    it("should not log to console when consoleOutput is false", function() {
      const extLogger = getExtensionLogger({
        extName: "MyExtName",
        logPath: TESTS_LOG_PATH,
        level: "info"
      });
      extLogger.fatal("Oy Vey!");
      extLogger.info("Oy Wow!");
      sinon.assert.notCalled(console.error);
      sinon.assert.notCalled(console.warn);
      sinon.assert.notCalled(console.log);
    });
  });
});
