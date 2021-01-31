import { expect } from "chai";
import {
  getLoggingLevelSetting,
  getSourceLocationTrackingSetting
} from "../src/settings";
import { GetLoggingLevelOpts } from "../src/helper-types";
import { WorkspaceConfiguration } from "vscode";

describe("The settings related utilities", () => {
  describe("The <getLoggingLevelSetting> function", () => {
    let getConfiguration: GetLoggingLevelOpts["getConfiguration"];

    before(() => {
      const settingsMap = new Map([
        ["ext1.loggingLevel", "debug"],
        ["otherExt.loggingLevel", "info"]
      ]);
      getConfiguration = _ =>
        (settingsMap as unknown) as WorkspaceConfiguration;
    });

    it("Can retrieve the logging level value from a configuration", () => {
      const logLevel = getLoggingLevelSetting({
        getConfiguration,
        loggingLevelProp: "ext1.loggingLevel"
      });
      expect(logLevel).to.equal("debug");
    });
  });

  describe("The <getSourceLocationTrackingSetting> function", () => {
    let getConfiguration: GetLoggingLevelOpts["getConfiguration"];

    before(() => {
      const settingsMap = new Map([
        ["ext1.sourceLocationTracking", true],
        ["otherExt.sourceLocationTracking", false]
      ]);
      getConfiguration = _ =>
        (settingsMap as unknown) as WorkspaceConfiguration;
    });

    it("Can retrieve the source location tracking value from a configuration", () => {
      const sourceLocationEnabled = getSourceLocationTrackingSetting({
        getConfiguration,
        sourceLocationProp: "otherExt.sourceLocationTracking"
      });
      expect(sourceLocationEnabled).to.be.false;
    });
  });
});
