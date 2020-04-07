const { expect } = require("chai");
const { getExtensionLogger } = require("../lib/api.js");

describe("VSCode Extension Logger", () => {
  /**
   * @type {typeof import("../api").getExtensionLogger}
   */

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
