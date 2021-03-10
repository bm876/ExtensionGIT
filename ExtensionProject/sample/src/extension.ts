// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var fs = require("fs");
var path = require('path');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// directorydisplay();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sample" is now active!');

	// const directoryPath = path.join(__dirname, 'Documents');
	// console.log("directoryPath");

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sample.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from sampleExtension!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand('sample.viewWSF', () => {
			vscode.window.showInformationMessage('View Workspace Files Extension is running!');
			const panel = vscode.window.createWebviewPanel(
				'WSFiles', // Identifies the type of the webview. Used internally
				'View Workspace Files', // Title of the panel displayed to the user
				vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				{} // Webview options. More on these later.
			);

			// Set HTML content
			panel.webview.html = getWebviewContent();
		})
	);
}

function getWebviewContent() {
	// var dir = path.join(__dirname, 'someDirectory');
	var dir = vscode.workspace.rootPath;
	var files = grabFiles(dir);
	console.log(files);
	var htmlString = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>View WorkSpace</title></head><body>`;
	for (let i = 0; i < files.length; i++) {
		htmlString += '<p>' +files[i]+ '</p>';
		console.log(files[i]);
	}
	htmlString += `</body></html>`;
	return htmlString;
  }

function grabFiles(path:any) {
    var arr:any = [];
    fs.readdirSync(path).forEach(function(f:any) {
        f = path+'\\'+f;
        if (fs.statSync(f) && fs.statSync(f).isDirectory()) {
			//Combine Array
            arr = arr.concat(grabFiles(f))
        } else {
			arr.push(f);
		}
    });
	arr.sort((a:any,b:any) => b.localeCompare(a));
	// console.log(arr);
    return arr;
  }


// this method is called when your extension is deactivated
export function deactivate() {}
