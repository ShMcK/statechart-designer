declare module '@antv/g6-editor' {
	interface FlowNodeOptions {
		anchor: number[][]
		draw(item: any): any
	}

	class Editor {
		add(item: any): void
		Minimap: (
			options: { container: string; height: number; width: number },
		) => void
		Toolbar: (options: { container: string }) => void
	}

	let EditorObject = {
		Flow: {
			registerNode: (
				name: string,
				options: object,
				extandShape?: string,
			) => void
		}
	}

	let G6Editor: EditorObject


	export default G6Editor
}
