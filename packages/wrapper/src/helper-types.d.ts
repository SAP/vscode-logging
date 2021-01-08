import {
  IChildLogger,
  IVSCodeExtLogger,
  LogLevel
} from "@vscode-logging/types";
// importing "vscode" in a **d.ts** files avoids a actual runtime dependency to vscode.
import { ExtensionContext, workspace } from "vscode";

export interface GetLoggingLevelOpts {
  getConfiguration: typeof workspace.getConfiguration;
  loggingLevelProp: string;
}

export interface GetSourceLocationOpts {
  getConfiguration: typeof workspace.getConfiguration;
  sourceLocationProp: string;
}

export interface ListenToLogSettingsOpts {
  subscriptions: ExtensionContext["subscriptions"];
  onDidChangeConfiguration: typeof workspace.onDidChangeConfiguration;
  getConfiguration: typeof workspace.getConfiguration;
  loggingLevelProp: string;
  sourceLocationProp: string;
  logger: IVSCodeExtLogger;
  logPath: string;
}

export interface LogLoggerDetailsOpts {
  logger: IChildLogger;
  logPath: string;
  logLevel: LogLevel;
}
