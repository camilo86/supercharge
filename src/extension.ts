import * as vscode from 'vscode';
import * as encoding from './lib/encoding';

/**
 * Initializes supercharge extension.
 * This function is called by vscode.
 *
 * @param context Extension context
 */
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'supercharge.base64Decode',
    async () => {
      const activeTextEditor = vscode.window.activeTextEditor;
      if (!activeTextEditor) {
        const text = await vscode.window.showInputBox({
          title: 'Supercharge: Base64 decode',
          placeHolder: 'Base64 encoded text',
        });

        // Do nothing if user cancels decoding command
        if (!text) {
          return;
        }

        vscode.env.clipboard.writeText(encoding.base64Decode(text));
        vscode.window.showInformationMessage(
          'Bas64 decoded string was copied to your clipboard.'
        );

        return;
      }

      const { selections } = activeTextEditor;

      if (selections.length === 0) {
      } else {
        const decodedTextRanges = selections.map((selection) => {
          const textRange = new vscode.Range(selection.start, selection.end);
          const text = activeTextEditor.document.getText(textRange);
          const decodedText = encoding.base64Decode(text);

          return { decodedText, textRange };
        });

        activeTextEditor.edit((editBuilder) => {
          decodedTextRanges.map(({ decodedText, textRange }) =>
            editBuilder.replace(textRange, decodedText)
          );
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * Deactives supercharge extension.
 * This function is called by vscode.
 */
export function deactivate() {}
