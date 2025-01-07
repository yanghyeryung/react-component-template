"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    console.log('"react-component-template" is now active!');
    const generateComponentTemplate = (componentName) => {
        const template = [
            `import { memo } from 'react'`,
            ``,
            `import { useStyles } from './style'`,
            ``,
            `// ----------------------------------------------------------------------`,
            ``,
            `const ${componentName} = () => {`,
            `	 const classes = useStyles()`,
            `	return (<></>)`,
            `}`,
            ``,
            `export default memo(${componentName})`
        ].join("\n");
        return template;
    };
    const generateStyleTemplate = () => {
        const template = [
            `import { makeStyles } from '@mui/styles'`,
            ``,
            `// ----------------------------------------------------------------------`,
            ``,
            `export const useStyles = makeStyles((theme) => ({`,
            `}))`
        ].join("\n");
        return template;
    };
    const newReactComponentTemplate = (type) => async (uri) => {
        const componentName = await vscode.window.showInputBox({
            prompt: 'Enter the react component name',
        });
        if (!componentName) {
            vscode.window.showErrorMessage('Enter the react component name!');
            return;
        }
        const folderPath = uri.fsPath;
        const newComponentPath = path.join(folderPath, componentName);
        if (!fs.existsSync(newComponentPath)) {
            fs.mkdirSync(newComponentPath);
            const componentTemplate = generateComponentTemplate(componentName);
            const styleTemplate = generateStyleTemplate();
            fs.writeFileSync(path.join(newComponentPath, `index.${type}`), componentTemplate);
            fs.writeFileSync(path.join(newComponentPath, 'styles.js'), styleTemplate);
            vscode.window.showInformationMessage('React Component Created!');
        }
        else {
            vscode.window.showErrorMessage(`React Component already Exist`);
        }
    };
    const disposableNewReactComponentTemplateJs = vscode.commands.registerCommand('react-component-template.new-react-component-template-js', newReactComponentTemplate('jsx'));
    const disposableNewReactComponentTemplateTs = vscode.commands.registerCommand('react-component-template.new-react-component-template-ts', newReactComponentTemplate('tsx'));
    context.subscriptions.push(disposableNewReactComponentTemplateJs);
    context.subscriptions.push(disposableNewReactComponentTemplateTs);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map