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
export default async function decodeBase64Command() {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor || activeTextEditor.selections.length === 0) {
    await decodeFromTextInput();
  } else {
    decodeSelections(activeTextEditor.selections, activeTextEditor);
  }
}

/**
 * Base64 decode flow using a text input.
 * Decoded text is copied to clipboard.
 * @returns Promise.
 */
async function decodeFromTextInput() {
  const text = await vscode.window.showInputBox({
    title: 'Supercharge: Base64 decode',
    placeHolder: 'Base64 encoded text',
  });

  if (!text) {
    return;
  }

  vscode.env.clipboard.writeText(encoding.decodeBase64(text));
  vscode.window.showInformationMessage(
    'Base64 decoded string was copied to your clipboard.'
  );
}

/**
 * Base64 decodes one or more text selections inline.
 * @param selections Selections to decode.
 * @param textEditor Text editor instance.
 */
function decodeSelections(
  selections: readonly vscode.Selection[],
  textEditor: vscode.TextEditor
) {
  const decodedTextRanges = selections.map((selection) => {
    const textRange = new vscode.Range(selection.start, selection.end);
    const text = textEditor.document.getText(textRange);
    const decodedText = encoding.decodeBase64(text);

    return { decodedText, textRange };
  });

  textEditor.edit((editBuilder) => {
    decodedTextRanges.map(({ decodedText, textRange }) =>
      editBuilder.replace(textRange, decodedText)
    );
  });
}
