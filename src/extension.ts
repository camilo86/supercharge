import * as vscode from 'vscode';
import base64DecodeCommand from './commands/base64Decode';

const commands = [
  { name: 'supercharge.base64Decode', handler: base64DecodeCommand },
];

/**
 * Initializes supercharge extension.
 * This function is called by vscode.
 *
 * @param context Extension context
 */
export function activate(context: vscode.ExtensionContext) {
  for (let command of commands) {
    context.subscriptions.push(
      vscode.commands.registerCommand(command.name, command.handler)
    );
  }
}

/**
 * Deactives supercharge extension.
 * This function is called by vscode.
 */
export function deactivate() {}
