import { Disposable } from "vscode";

export interface  Command {
    register(): any;
}