import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    
    let disposable = vscode.workspace.onDidChangeTextDocument((event) => {
        const editor = vscode.window.activeTextEditor;

        if (editor && editor.document.languageId === 'css') {
            const document = editor.document;
            const text = document.getText();
            const regex = /(\d+)px/g;
            let match;

       
            while ((match = regex.exec(text)) !== null) {
                const pxValue = parseFloat(match[1]);

               
                const line = document.lineAt(document.positionAt(match.index).line);
                if (line.text.includes('/*')) {
                    continue;
                }

               
                const remValue = (pxValue / 16).toFixed(2);
                const emValue = (pxValue / 16).toFixed(2);
                const vwValue = ((pxValue / document.lineAt(0).range.end.character) * 100).toFixed(2);

                const comment = ` /* ${pxValue}px = ${remValue}rem = ${emValue}em = ${vwValue}vw */`;

              
                const edit = new vscode.WorkspaceEdit();
                const position = document.positionAt(match.index + match[0].length);
                edit.insert(document.uri, position, comment);

           
                vscode.workspace.applyEdit(edit);
            }
        }
    });

    context.subscriptions.push(disposable);
}


export function deactivate() {}
