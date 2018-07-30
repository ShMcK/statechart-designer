import G6Editor, { IEditorEvent } from '@antv/g6-editor'

import { save } from '../../utils/storage'

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

	page.on('afterchange', () => {
		const data = page.save()
		save(data)
	})

	return {
		page,
		editor,
	}
}

export default initEditorComponents
