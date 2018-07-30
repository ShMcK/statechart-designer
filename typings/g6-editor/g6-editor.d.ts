declare module '@antv/g6-editor' {
	export interface IEditorEvent {
		currentItem: any
		currentShape: any
		shape: any
		item: {
			getModel(): any
		}
		domEvent: any
		x: number
		y: number
		anchor: {
			index: number
			x: number
			y: number
			type: string
		}
		source: any
		target: any
		sourceAnchor: any
		targetAnchor: any
		dragEndPointType: any
		action: any
		toShape: any
		toItem: any
		updateMatrix: any
		cancel: any
	}

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
