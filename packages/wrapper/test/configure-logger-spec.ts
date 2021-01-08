import { expect } from "chai";
import { ExtensionContext, WorkspaceConfiguration } from "vscode";
import { IChildLogger, LogLevel } from "@vscode-logging/types";
import { BasicOutputChannel } from "@vscode-logging/logger";
import { configureLogger } from "../src/api";
import { ConfigureLoggerOpts } from "../api";

describe("The `configureLogger` main wrapper utility function", () => {
  let outputChannelMock: BasicOutputChannel;
  let subscriptions: ExtensionContext["subscriptions"];
  let onDidChangeConfiguration: ConfigureLoggerOpts["onDidChangeConfiguration"];
  let loggingLevelProp: string;
  let sourceLocationProp: string;
  let configLogLevel: LogLevel;
  let getConfiguration: ConfigureLoggerOpts["getConfiguration"];
  let loggedLines: Record<string, unknown>[];

  beforeEach(() => {
    loggedLines = [];
    subscriptions = [];
  });

  before(() => {
    outputChannelMock = {
      appendLine(value: string): void {
        loggedLines.push(JSON.parse(value));
      },
      dispose(): void {},
      show(): void {}
    };

    // we are not testing configuration changes in this spec, these will be tested
    // in `settings-changes-handler-spec`
    onDidChangeConfiguration = () => {
      return { dispose() {} };
    };

    loggingLevelProp = "my_vscode_ext.loggingLevel";
    sourceLocationProp = "my_vscode_ext.sourceLocationTracking";
    configLogLevel = "debug";
    const settingsMap = new Map<string, string | boolean>([
      [loggingLevelProp, configLogLevel],
      [sourceLocationProp, false]
    ]);
    // don't worry be happy (or unknown)...
    getConfiguration = _ => (settingsMap as unknown) as WorkspaceConfiguration;
  });

  function configureLoggerHelper(): IChildLogger {
    return configureLogger({
      extName: "my_vscode_ext",
      // only logging "in memory" during our test.
      logPath: (undefined as unknown) as string,
      loggingLevelProp: "my_vscode_ext.loggingLevel",
      sourceLocationProp: "my_vscode_ext.sourceLocationTracking",
      logOutputChannel: outputChannelMock,
      subscriptions,
      getConfiguration,
      onDidChangeConfiguration
    });
  }

  it("will log initial details on configure", () => {
    expect(loggedLines).to.be.empty;
    configureLoggerHelper();
    expect(loggedLines).to.have.lengthOf(2);
    const loggerDetailsEntry = loggedLines[0];
    expect(loggerDetailsEntry.message).to.include(configLogLevel);
  });

  it("will return a VSCodeExtLogger that can be used for 'regular logging' e.g log/info/debug", () => {
    expect(loggedLines).to.be.empty;
    const testLogger = configureLoggerHelper();
    loggedLines = [];
    testLogger.debug("hello world", { param1: 666 });
    expect(loggedLines).to.have.lengthOf(1);
    const loggerEntry = loggedLines[0];
    expect(loggerEntry.message).to.equal("hello world");
    expect(loggerEntry.param1).to.equal(666);
  });
});
