import * as vscode from 'vscode';
import * as encoding from '../lib/encoding';

/**
 * Commands to encode strings to base64.
 *
 * When selecting a piece of text and running this command, it will
 * replace in-place with the encoded base64 string.
 *
 * If used without selection, a text input asks for string to encode,
 * and then copies the base64 encoded string to your clipboard.
 */
export default async function base64EncodeCommand() {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor || activeTextEditor.selections.length === 0) {
    await encodeFromTextInput();
  } else {
    encodeSelections(activeTextEditor.selections, activeTextEditor);
  }
}

/**
 * Base64 encode flow using a text input.
 * Encode text is copied to clipboard.
 * @returns Promise
 */
async function encodeFromTextInput() {
  const text = await vscode.window.showInputBox({
    title: 'Supercharge: Base64 encode',
    placeHolder: 'Text to encode',
  });

  if (!text) {
    return;
  }

  vscode.env.clipboard.writeText(encoding.base64Encode(text));
  vscode.window.showInformationMessage(
    'Base64 encoded string was copied to your clipboard.'
  );
}

/**
 * Base64 encodes one or more text selections inline.
 * @param selections Selections to encode.
 * @param textEditor Text editor instance.
 */
function encodeSelections(
  selections: readonly vscode.Selection[],
  textEditor: vscode.TextEditor
) {
  const encodedTextRanges = selections.map((selection) => {
    const textRange = new vscode.Range(selection.start, selection.end);
    const text = textEditor.document.getText(textRange);
    const encodedText = encoding.base64Encode(text);

    return { encodedText, textRange };
  });

  textEditor.edit((editBuilder) => {
    encodedTextRanges.map(({ encodedText, textRange }) =>
      editBuilder.replace(textRange, encodedText)
    );
  });
}
