declare module '@antv/g6-editor' {
	export interface IFlowNodeOptions extends IItem {
		type?: string
		anchor?: number[]
		draw?(item: any): any
		drawCollapsed?(item: any): any
		drawExpanded?(item: any): any
		drawKeyShape?(a: any, b: any, c: any, d: any, e: any): any
		drawLabel?(a: any, b: any, c: any): any
		getActivedOutterStyle?(): any
		getActivedStyle?(): any
		getLabel?(item: any): any
		getPath?(): any
		getSelectedOUtterStyle?(): any
		getSelectedStyle?(): any
	}

	class Editor {
		add(item: any): void
		Minimap: (
			options: { container: string; height: number; width: number },
		) => void
		Toolbar: (options: { container: string }) => void
	}

	export interface IFlow {
		registerNode(name: string, options: object, extandShape?: string): void
		registerGroup(name: string, options: object, extandShape?: string): void
	}

	export interface G6Editor {
		Flow: IFlow
	}

	function editorOn(action: 'aftercommandexecute', ev: { command: any }): void

	export interface IEditor {
		add(a: any): any
		commandEnable(a: any): any
		destroy(): void
		executeCommand(a?: any, b?: any): any
		getCommands(): any
		getComponents(): any
		getComponentsByType(type: string): any
		getCurrentCommand(): any
		getCurrentPage(): any
		getDefaultCfg(): any
		setCommandDOMenable(): any
		on: editorOn
	}

	let G6Editor: EditorObject

	export default G6Editor
}
