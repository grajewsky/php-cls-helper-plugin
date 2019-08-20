import { Command } from './command';
import * as vscode from 'vscode';


export class ClassGenerate implements Command {

    private context: vscode.ExtensionContext;
    private composerFilePath: vscode.Uri | undefined;
    private projectPath: string | undefined;
    private paths: string[] = [];
    private composer: any;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }
    register() {
        return vscode.commands.registerCommand('extension.phpGenerateClass', () => {

            vscode.window.showInformationMessage('Generate PHP Class');
            this.projectPath = new String(vscode.workspace.rootPath).toString();
            this.loadComposerFile();
            const filePath = this.loadCurrentOpenFile();
            if (filePath) {
                const pathSplit = filePath.fsPath.split("\\");
                const clsName = pathSplit[pathSplit.length-1].split('.')[0];
                this.insertClassIntoFile(filePath, clsName);
                vscode.commands.executeCommand('namespaceResolver.generateNamespace');
            } else {

                vscode.window.showInformationMessage('Cant Generate PHP class, no opened *.php file!');
            }
        });
    }
    private loadCurrentOpenFile(): vscode.Uri | null {
        const file = vscode.window.activeTextEditor;
        if (file) {
            return file.document.uri;
        }
        return null;
    }
    private loadComposerFile(): void {

    }
    private insertClassIntoFile(uri: vscode.Uri, clsName: string): void {
        console.log(this.context.extensionPath, clsName);
        vscode.workspace.fs.writeFile(uri, new Buffer("<?php \n\nclass " + clsName + " {\n\t\n}")).then( () => {
            vscode.commands.executeCommand('namespaceResolver.generateNamespace');
        });
    }

}