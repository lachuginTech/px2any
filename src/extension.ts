import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  
    let hoverProvider = vscode.languages.registerHoverProvider('css', {
        provideHover(document, position, token) {
           
            const range = document.getWordRangeAtPosition(position, /(\d+)px/);
            if (range) {
                const word = document.getText(range);
                const pxValue = parseFloat(word);

               
                const remValue = (pxValue / 16).toFixed(2);
                const emValue = (pxValue / 16).toFixed(2);
                const vwValue = ((pxValue / document.lineAt(0).range.end.character) * 100).toFixed(2);

                
                const hoverText = `${pxValue}px = ${remValue}rem = ${emValue}em = ${vwValue}vw`;

              
                return new vscode.Hover(hoverText);
            }
        }
    });

   
    context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
