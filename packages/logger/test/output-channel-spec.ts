import { window, OutputChannel } from "vscode";
import { BasicOutputChannel } from "../api";

// We check that vscodeOutputChannel is assignable to BasicOutputChannel.
// Checked in `type-check` npm script
const vscodeChannel: OutputChannel = window.createOutputChannel("test");
const basicChannel: BasicOutputChannel = vscodeChannel;
