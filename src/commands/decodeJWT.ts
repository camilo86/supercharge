import * as vscode from 'vscode';
import * as encoding from '../lib/encoding';

/**
 * Commands to decode JSON Web Tokens into its three parts: header, payload and signature.
 *
 * When selecting a JWT and running this command, it will
 * replace in-place with the decoded representation.
 *
 * If used without selection, a text input asks for JWT,
 * and then copies the decoded representation to your clipboard.
 */
export default async function decodeJWTCommand() {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor || activeTextEditor.selections.length === 0) {
    await decodeJWTFromTextInput();
  } else {
    decodeSelections(activeTextEditor.selections, activeTextEditor);
  }
}

/**
 * Wrapper function that decodes JWT and formats header,payload, signature
 * into commented blocks.
 * @param jwt JSON Web Token
 * @returns Decoded JWT with comments
 */
function decodeJWT(jwt: string) {
  const { header, payload, signature } = encoding.decodeJWT(jwt);

  return `
    // Header
    ${header}

    // Payload
    ${payload}

    // Signature
    ${signature}
    `;
}

/**
 * JWT decode flow using a text input.
 * Decoded JWT is copied to clipboard.
 * @returns Promise.
 */
async function decodeJWTFromTextInput() {
  const text = await vscode.window.showInputBox({
    title: 'Supercharge: Base64 encode',
    placeHolder: 'Text to encode',
  });

  if (!text) {
    return;
  }

  vscode.env.clipboard.writeText(decodeJWT(text));
  vscode.window.showInformationMessage(
    'Base64 encoded string was copied to your clipboard.'
  );
}

/**
 * JWT decodes one or more text selections inline.
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
    const decodedJWT = decodeJWT(text);

    return { decodedJWT, textRange };
  });

  textEditor.edit((editBuilder) => {
    decodedTextRanges.map(({ decodedJWT, textRange }) =>
      editBuilder.replace(textRange, decodedJWT)
    );
  });
}
