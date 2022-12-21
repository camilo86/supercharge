import * as vscode from 'vscode';
import decodeBase64Command from './commands/decodeBase64';
import encodeBase64Command from './commands/encodeBase64';
import generateGUIDCommand from './commands/generateGUID';

const commands = [
  { name: 'supercharge.decodeBase64', handler: decodeBase64Command },
  { name: 'supercharge.encodeBase64', handler: encodeBase64Command },
  { name: 'supercharge.generateGUID', handler: generateGUIDCommand },
];

/**
 * Initializes supercharge extension.
 * This function is called by vscode.
 *
 * @param context Extension context.
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
