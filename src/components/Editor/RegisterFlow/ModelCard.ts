import { IKeyShape, INodeItem } from '@antv/g6'
import { IFlow, IFlowNodeOptions } from '@antv/g6-editor'
import anchor from './anchor'

export default (Flow: IFlow): void => {
	Flow.registerNode('model-card', {
		draw(this: IFlowNodeOptions, item: INodeItem) {
			const group = item.getGraphicGroup()
			const model = item.getModel()

			const groups = item.graph.getGroups()

			const getAnchorPoints = item.getAnchorPoints

			// overwrite getAnchorPoints to add node & group points
			item.getAnchorPoints = function(this: INodeItem) {
				let anchorPoints = getAnchorPoints.call(item)
				if (!item.dragging) {
					for (const g of groups) {
						const groupAnchors = g.getAnchorPoints()
						anchorPoints = anchorPoints.concat(groupAnchors)
					}
				}
				return anchorPoints
			}

			const width = 184
			const height = 40
			const x = -width / 2
			const y = -height / 2
			const borderRadius = 4

			// state outline
			const keyShape: IKeyShape = group.addShape('rect', {
				attrs: {
					x,
					y,
					width,
					height,
					radius: borderRadius,
					fill: 'white',
					stroke: '#CED4D9',
				},
			})

			// defaults
			model.initial = model.initial || false
			model.label = model.label || 'State'
			model.onEntry = model.onEntry || []
			model.onExit = model.onExit || []

			// state title
			group.addShape('text', {
				attrs: {
					text: model.label,
					x: x + 13,
					y: y + 13,
					textAlign: 'start',
					textBaseline: 'top',
					fill: 'rgba(0,0,0,0.65)',
				},
			})

			// initial icon
			group.addShape('image', {
				attrs: {
					img: model.initial ? '/assets/icons/initial-state.svg' : null,
					x: x - 10 + width / 2,
					y: y - 40,
					width: 19,
					height: 40,
				},
			})

			return keyShape
		},
		anchor,
	})
}
