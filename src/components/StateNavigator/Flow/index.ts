import {
	IAction,
	IData,
	IGraph,
	IItem,
	INode,
	IPoint,
	IPointType,
} from '@antv/g6'

import getSiblingNodes from 'utils/getSiblingNodes'
import { save } from 'utils/storage'

export default (page: IGraph, onChange: any) => {
	page.on('afteritemselected', (ev: { item: IItem }) => {
		onChange({
			selectedModel: ev.item.getModel(),
		})
	})

	// before connecting anchor point
	page.on(
		'hoveranchor:beforeaddedge',
		(ev: { anchor: IPoint; item: IItem; cancel: boolean }) => {
			if (ev.anchor.type === 'input') {
				ev.cancel = true
			}
		},
	)

	page.on(
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
		},
	)

	page.on('beforechange', (ev: { action: IAction; item: any; model: any }) => {
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

	page.on(
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
							page.update(item, item.model)
						}

						break
					case 'edge':
						// highlight transition on creation
						item.model.label = item.id
						page.clearSelected()
						page.setSelected(item.id, true)
						page.update(item, item.model)

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
								page.update(nodeItem, nodeItem.model)
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
			const data: IData = page.save()
			save(data)
		},
	)

	return page
}
