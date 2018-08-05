import {
	IAction,
	IData,
	IGraph,
	IItem,
	INode,
	IPoint,
	IPointType,
	IZoom,
} from '@antv/g6'
import G6Editor from '@antv/g6-editor'

import getSiblingNodes from '../../../utils/getSiblingNodes'
import { save } from '../../../utils/storage'

export default (onChange: any) => {
	const flow: IGraph = new G6Editor.Flow({
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

	flow.on('afteritemselected', (ev: { item: IItem }) => {
		onChange({
			selectedModel: ev.item.getModel(),
		})
	})
	flow.on('afterzoom', (ev: IZoom) => {
		onChange({
			curZoom: ev.updateMatrix[0],
		})
	})

	// before connecting anchor point
	flow.on(
		'hoveranchor:beforeaddedge',
		(ev: { anchor: IPoint; item: IItem; cancel: boolean }) => {
			if (ev.anchor.type === 'input') {
				ev.cancel = true
			}
		},
	)

	flow.on(
		'dragedge:beforeshowanchor',
		(ev: {
			cancel: boolean
			dragEndPointType: IPointType
			source: IItem
			sourceAnchor: IPoint
			target: IItem
			targetAnchor: IPoint
		}) => {
			// inputs connect to outputs
			if (
				!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')
			) {
				ev.cancel = true
			}
			// cancels if not connected to target
			if (
				ev.dragEndPointType === 'target' &&
				flow.anchorHasBeenLinked(ev.target, ev.targetAnchor)
			) {
				ev.cancel = true
			}

			// cancels if not connected to source
			if (
				ev.dragEndPointType === 'source' &&
				flow.anchorHasBeenLinked(ev.source, ev.sourceAnchor)
			) {
				ev.cancel = true
			}
		},
	)

	flow.on('beforechange', (ev: { action: IAction; item: any; model: any }) => {
		if (ev.action === 'add') {
			const { model } = ev
			switch (model.type) {
				case 'node':
					break
				case 'edge':
					break
				case 'group':
					break
				default:
					return
			}
		}
	})

	flow.on(
		'afterchange',
		(ev: { action: IAction; item: any; model: any; updateModel: any }) => {
			if (ev.action === 'add') {
				const { item } = ev
				switch (item.type) {
					case 'node':
						const siblings = getSiblingNodes(ev.item.id, ev.item.dataMap)

						// set first node to "initial": true
						const firstNode = siblings.length === 0
						if (firstNode) {
							item.model.initial = true
							flow.update(item, item.model)
						}

						break
					case 'edge':
						// highlight transition on creation
						item.model.label = 'Event'
						flow.clearSelected()
						flow.setSelected(item.id, true)

						break
					case 'group':
						break
					default:
				}
			} else if (ev.action === 'update') {
				const { item, updateModel } = ev
				switch (item.type) {
					case 'node':
						// treat initial like a radio button with its siblings
						if (updateModel.initial && updateModel.initial === true) {
							const siblings = getSiblingNodes(ev.item.id, ev.item.dataMap)
							const resetSiblingInitial = siblings.filter(
								(node: INode) => node.initial,
							)
							resetSiblingInitial.forEach((node: INode) => {
								const nodeItem = item.itemMap._nodes.find(
									(id: string) => node.id,
								)
								nodeItem.model.initial = false
								flow.update(nodeItem, nodeItem.model)
							})
						}
						break
					case 'edge':
						break
					case 'group':
						break
					default:
				}
			}

			// save
			const data: IData = flow.save()
			save(data)
		},
	)

	return flow
}
