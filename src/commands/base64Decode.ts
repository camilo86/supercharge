import * as vscode from 'vscode';
import * as encoding from '../lib/encoding';

/**
 * Commands to decode base64 strings.
 *
 * When selecting a piece of text and running this command, it will
 * replace in-place with the decoded base64 string.
 *
 * If used without selection, a text input asks for base64 encoded string,
 * and then copies the decoded string to your clipboard.
 */
export default async function base64DecodeCommand() {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor || activeTextEditor.selections.length === 0) {
    await decodeFromTextInput();
  } else {
    decodeSelections(activeTextEditor.selections, activeTextEditor);
  }
}

async function decodeFromTextInput() {
  const text = await vscode.window.showInputBox({
    title: 'Supercharge: Base64 decode',
    placeHolder: 'Base64 encoded text',
  });

  if (!text) {
    return;
  }

  vscode.env.clipboard.writeText(encoding.base64Decode(text));
  vscode.window.showInformationMessage(
    'Base64 decoded string was copied to your clipboard.'
  );
}

function decodeSelections(
  selections: readonly vscode.Selection[],
  textEditor: vscode.TextEditor
) {
  const decodedTextRanges = selections.map((selection) => {
    const textRange = new vscode.Range(selection.start, selection.end);
    const text = textEditor.document.getText(textRange);
    const decodedText = encoding.base64Decode(text);

    return { decodedText, textRange };
  });

  textEditor.edit((editBuilder) => {
    decodedTextRanges.map(({ decodedText, textRange }) =>
      editBuilder.replace(textRange, decodedText)
    );
  });
}
