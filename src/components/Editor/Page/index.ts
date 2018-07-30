import G6Editor, { IEditorEvent } from '@antv/g6-editor'
import { save } from '../../../utils/storage'

export default (onChange: any) => {
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

	page.on('edge', (ev: any) => {
		console.log('BEFORE ADD EDGE', ev)
	})

	page.on('afterchange', (ev: any) => {
		// highlight transition on creation
		if (ev.action === 'add' && ev.item.type === 'edge') {
			page.clearSelected()
			page.setSelected(ev.item.id, true)
		}

		// save
		const data = page.save()
		save(data)
	})

	return page
}
