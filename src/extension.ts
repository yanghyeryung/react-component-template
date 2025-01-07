import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

export function activate(context: vscode.ExtensionContext) {
	console.log('"react-component-template" is now active!')

	const generateComponentTemplate = (componentName: string): string => {
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

		return template
	}
	const generateStyleTemplate = (): string => {
		const template = [
            `import { makeStyles } from '@mui/styles'`,
            ``,
            `// ----------------------------------------------------------------------`,
			``,
            `export const useStyles = makeStyles((theme) => ({`,
			`}))`
        ].join("\n");

		return template
	}

	const newReactComponentTemplate = (type: 'tsx' | 'jsx') => async (uri: any) => {
		const componentName = await vscode.window.showInputBox({
			prompt: 'Enter the react component name',
		})

		if (!componentName) {
			vscode.window.showErrorMessage('Enter the react component name!')
			return
		}

		const folderPath = uri.fsPath;
		const newComponentPath = path.join(folderPath, componentName)

		if (!fs.existsSync(newComponentPath)) {
			fs.mkdirSync(newComponentPath)

			const componentTemplate = generateComponentTemplate(componentName)
			const styleTemplate = generateStyleTemplate()
		
			fs.writeFileSync(path.join(newComponentPath, `index.${type}`), componentTemplate)
			fs.writeFileSync(path.join(newComponentPath, 'styles.js'), styleTemplate)

			vscode.window.showInformationMessage('React Component Created!')
		} else {
			vscode.window.showErrorMessage(`React Component already Exist`);
		}
	}

	const disposableNewReactComponentTemplateJs = vscode.commands.registerCommand('react-component-template.new-react-component-template-js', newReactComponentTemplate('jsx'))
	const disposableNewReactComponentTemplateTs = vscode.commands.registerCommand('react-component-template.new-react-component-template-ts', newReactComponentTemplate('tsx'))

	context.subscriptions.push(disposableNewReactComponentTemplateJs)
	context.subscriptions.push(disposableNewReactComponentTemplateTs)
}

export function deactivate() {}
