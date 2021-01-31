import { expect } from "chai";
import {
  ConfigurationChangeEvent,
  ConfigurationScope,
  Disposable,
  ExtensionContext,
  WorkspaceConfiguration
} from "vscode";
import { LogLevel } from "@vscode-logging/logger";
import { IChildLogger, IVSCodeExtLogger } from "@vscode-logging/types";
import { ConfigureLoggerOpts } from "../api";
import { listenToLogSettingsChanges } from "../src/settings-changes-handler";

describe("The `listenToLogSettingsChanges` utility function", () => {
  let logger: IVSCodeExtLogger;
  let loggingLevelProp: string;
  let sourceLocationProp: string;
  let logPath: string;
  let getConfiguration: ConfigureLoggerOpts["getConfiguration"];
  let onDidChangeConfiguration: ConfigureLoggerOpts["onDidChangeConfiguration"];
  let subscriptions: ExtensionContext["subscriptions"];
  let currentLogLevel: LogLevel;
  let currentSourceLocationTracking: boolean;

  beforeEach(() => {
    currentLogLevel = "error";
    currentSourceLocationTracking = false;
  });

  before(() => {
    logPath = "c:\\logs";

    logger = {
      changeLevel(newLevel: LogLevel) {
        currentLogLevel = newLevel;
      },
      changeSourceLocationTracking(newSourceLocation: boolean) {
        currentSourceLocationTracking = newSourceLocation;
      },
      getChildLogger(): IChildLogger {
        return this;
      },
      fatal(): void {},
      error(): void {},
      warn(): void {},
      info(): void {},
      debug(): void {},
      trace(): void {}
    };

    loggingLevelProp = "my_vscode_ext.loggingLevel";
    sourceLocationProp = "my_vscode_ext.sourceLocationTracking";
    subscriptions = [];
  });

  context("affects Configuration", () => {
    before(() => {
      const settingsMap = new Map<string, string | boolean>([
        [loggingLevelProp, "info"],
        [sourceLocationProp, true]
      ]);
      // don't worry be happy (or unknown)...
      getConfiguration = _ =>
        (settingsMap as unknown) as WorkspaceConfiguration;

      onDidChangeConfiguration = function(
        cb: (e: ConfigurationChangeEvent) => void
      ): Disposable {
        const e: ConfigurationChangeEvent = {
          affectsConfiguration(): boolean {
            return true;
          }
        };
        cb(e);
        return { dispose(): any {} };
      };
    });

    it("will listen to `logLevel` changes", () => {
      expect(currentLogLevel).to.equal("error");
      listenToLogSettingsChanges({
        sourceLocationProp,
        loggingLevelProp,
        getConfiguration,
        logger,
        logPath,
        onDidChangeConfiguration,
        subscriptions
      });
      expect(currentLogLevel).to.equal("info");
    });

    it("will listen to `sourceLocationTracking` changes", () => {
      expect(currentSourceLocationTracking).to.be.false;
      listenToLogSettingsChanges({
        sourceLocationProp,
        loggingLevelProp,
        getConfiguration,
        logger,
        logPath,
        onDidChangeConfiguration,
        subscriptions
      });
      expect(currentSourceLocationTracking).to.be.true;
    });
  });

  context("does **not** affects Configuration", () => {
    before(() => {
      const settingsMap = new Map<string, string | number>([
        ["someOtherProp", "blue"],
        ["someOtherProp2", 666]
      ]);
      // don't worry be happy (or unknown)...
      getConfiguration = _ =>
        (settingsMap as unknown) as WorkspaceConfiguration;

      onDidChangeConfiguration = function(
        cb: (e: ConfigurationChangeEvent) => void
      ): Disposable {
        const e: ConfigurationChangeEvent = {
          affectsConfiguration(): boolean {
            return false;
          }
        };
        cb(e);
        return { dispose(): any {} };
      };
    });

    it("will **not** listen to unrelated configuration changes - logLevel", () => {
      expect(currentLogLevel).to.equal("error");
      listenToLogSettingsChanges({
        sourceLocationProp,
        loggingLevelProp,
        getConfiguration,
        logger,
        logPath,
        onDidChangeConfiguration,
        subscriptions
      });
      expect(currentLogLevel).to.equal("error");
    });

    it("will **not** listen to unrelated configuration changes - sourceLocationTracking", () => {
      expect(currentSourceLocationTracking).to.be.false;
      listenToLogSettingsChanges({
        sourceLocationProp,
        loggingLevelProp,
        getConfiguration,
        logger,
        logPath,
        onDidChangeConfiguration,
        subscriptions
      });
      expect(currentSourceLocationTracking).to.be.false;
    });
  });
});
