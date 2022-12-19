import * as vscode from 'vscode';
import * as generator from '../lib/generator';

/**
 * Command to generate a GUID or UUID.
 *
 * Supports generating GUIDs inline in a document
 * or copying a new GUID to clipboard when a document
 * is not opened.
 */
export default async function generateGUID() {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor || activeTextEditor.selections.length === 0) {
    await generateGUIDInClipboard();
  } else {
    generateGUIDInSelections(activeTextEditor.selections, activeTextEditor);
  }
}

/**
 * Generates a new GUID and writes it to clipboard.
 */
async function generateGUIDInClipboard() {
  const uuid = generator.generateUUID();

  vscode.env.clipboard.writeText(uuid);
  vscode.window.showInformationMessage(
    'GUID/UUID was copied to your clipboard.'
  );
}

/**
 * Generates a GUID in text selections inline.
 * @param selections Text selections.
 * @param textEditor Text editor instance.
 */
async function generateGUIDInSelections(
  selections: readonly vscode.Selection[],
  textEditor: vscode.TextEditor
) {
  textEditor.edit((editBuilder) => {
    for (let selection of selections) {
      const selectionRange = new vscode.Range(selection.start, selection.end);

      editBuilder.replace(selectionRange, generator.generateUUID());
    }
  });
}
