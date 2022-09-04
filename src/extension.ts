import { resolveCliArgsFromVSCodeExecutablePath } from '@vscode/test-electron';
import * as vscode from 'vscode';

let toHexButton: vscode.StatusBarItem;
let toBinButton: vscode.StatusBarItem;
let toDecButton: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {

	const tohex = "number-system-converter.toHex";
	const tobin = "number-system-converter.toBin";
	const todec = "number-system-converter.toDec";

	subscriptions.push(vscode.commands.registerCommand(tohex, () => {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return;
		}
		const sel = editor.selection;
		let text = editor.document.getText(sel);
		if (text.length === 0) {
			return;
		}
		let num = 0;
		if (text.startsWith("0x")) {
			return;
		}
		else if (text.startsWith("0b")) {
			text = text.slice("0b".length);
			num = parseInt(text, 2);
			if (isNaN(num)) {
				vscode.window.showErrorMessage("Not a valid number!");
				return;
			}
		} else {
			num = parseInt(text, 10);
			if (isNaN(num)) {
				vscode.window.showErrorMessage("Not a valid number!");
				return;
			}
		}
		editor.edit((builder) => {
			builder.replace(sel, "0x" + num.toString(16));
		});
	}));

	subscriptions.push(vscode.commands.registerCommand(tobin, () => {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return;
		}
		const sel = editor.selection;
		let text = editor.document.getText(sel);
		if (text.length === 0) {
			return;
		}
		let num = 0;
		if (text.startsWith("0b")) {
			return;
		}
		else if (text.startsWith("0x")) {
			text = text.slice("0x".length);
			num = parseInt(text, 16);
			if (isNaN(num)) {
				vscode.window.showErrorMessage("Not a valid number!");
				return;
			}
		} else {
			num = parseInt(text, 10);
			if (isNaN(num)) {
				vscode.window.showErrorMessage("Not a valid number!");
				return;
			}
		}
		editor.edit((builder) => {
			builder.replace(sel, "0b" + num.toString(2));
		});
	}));

	subscriptions.push(vscode.commands.registerCommand(todec, () => {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return;
		}
		const sel = editor.selection;
		let text = editor.document.getText(sel);
		if (text.length === 0) {
			return;
		}
		let num = parseInt(text, 10);
		if (isNaN(num)) {
			vscode.window.showErrorMessage("Not a valid number!");
			return;
		}
		if (!text.startsWith("0b") && !text.startsWith("0x")) {
			return;
		}
		else if (text.startsWith("0x")) {
			text = text.slice("0x".length);
			num = parseInt(text, 16);
			if (isNaN(num)) {
				vscode.window.showErrorMessage("Not a valid number!");
				return;
			}
		} else if (text.startsWith("0b")) {
			text = text.slice("0b".length);
			num = parseInt(text, 2);
			if (isNaN(num)) {
				vscode.window.showErrorMessage("Not a valid number!");
				return;
			}
		}
		editor.edit((builder) => {
			builder.replace(sel, num.toString());
		});
	}));

	toHexButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
	toHexButton.command = tohex;
	toHexButton.text = "0x";
	toHexButton.show();
	subscriptions.push(toHexButton);

	toBinButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
	toBinButton.command = tobin;
	toBinButton.text = "0b";
	toBinButton.show();

	toDecButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
	toDecButton.command = todec;
	toDecButton.text = "10";
	toDecButton.show();
	subscriptions.push(toDecButton);
}