import G6Editor from '@antv/g6-editor'

interface IEditorEvent {
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

const initEditorComponents = (onChange: (change: any) => void) => {
	const editor = new G6Editor()

	const minimap = new G6Editor.Minimap({
		container: 'minimap',
		height: 120,
		width: 200,
	})

	const toolbar = new G6Editor.Toolbar({
		container: 'toolbar',
	})

	const contextmenu = new G6Editor.Contextmenu({
		container: 'contextmenu',
	})

	const itempannel = new G6Editor.Itempannel({
		container: 'itempannel',
	})

	const detailpannel = new G6Editor.Detailpannel({
		container: 'detailpannel',
	})

	const page = new G6Editor.Flow({
		align: {
			grid: true,
		},
		edgeResizeable: false,
		graph: {
			container: 'page',
			height: window.innerHeight - 38,
		},
		noEndEdge: false,
	})

	page.on('afteritemselected', (ev: IEditorEvent) => {
		onChange({
			selectedModel: ev.item.getModel(),
		})
	})
	page.on('afterzoom', (ev: IEditorEvent) => {
		onChange({
			curZoom: ev.updateMatrix[0],
		})
	})
	editor.add(minimap)
	editor.add(toolbar)
	editor.add(contextmenu)
	editor.add(itempannel)
	editor.add(detailpannel)
	editor.add(page)

	// before connecting anchor point
	page.on('hoveranchor:beforeaddedge', (ev: IEditorEvent) => {
		if (ev.anchor.type === 'input') {
			ev.cancel = true
		}
	})
	page.on('dragedge:beforeshowanchor', (ev: IEditorEvent) => {
		// inputs connect to outputs
		if (
			!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')
		) {
			ev.cancel = true
		}
		// cancels if not connected to target
		if (
			ev.dragEndPointType === 'target' &&
			page.anchorHasBeenLinked(ev.target, ev.targetAnchor)
		) {
			ev.cancel = true
		}

		// cancels if not connected to source
		if (
			ev.dragEndPointType === 'source' &&
			page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)
		) {
			ev.cancel = true
		}
	})

	return {
		page,
		editor,
	}
}

export default initEditorComponents
