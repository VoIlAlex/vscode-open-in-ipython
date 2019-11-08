// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.openInIPython', async function (fileURI = null) {
		// The code you place here will be executed every time your command is executed

		// get paths to files in cwd
		// TODO: list of paths to choose from
		// // let cwd = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1]
		// // var files_in_cwd = fs.readdirSync(cwd);


		// path to file 
		// that will be opened
		// in IPython
		let path_to_file = null
		if (fileURI != null) {
			path_to_file = fileURI._fsPath;
		} else {
			path_to_file = await vscode.window.showInputBox({
				placeHolder: "Path to a file that should be opened in IPython"
			})
		}
		// Cancellation
		if (path_to_file === null || path_to_file === undefined) {
			return;
		}

		// create terminal
		// with the file opened
		let extensionTerminal = vscode.window.createTerminal("IPython", "ipython");


		// open file in IPython
		extensionTerminal.sendText(`f = open('${path_to_file}', 'r+')`)
		extensionTerminal.show();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}