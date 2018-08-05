import { IFlow } from '@antv/g6-editor'

export default (Flow: IFlow): void => {
	Flow.registerNode('model-card', {
		draw(this: any, item: any) {
			const group = item.getGraphicGroup()
			const model = item.getModel()
			const width = 184
			const height = 40
			const x = -width / 2
			const y = -height / 2
			const borderRadius = 4

			// state outline
			const keyShape = group.addShape('rect', {
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

			// state title
			group.addShape('text', {
				attrs: {
					text: model.label ? model.label : this.label || 'state',
					x: x + 13,
					y: y + 13,
					textAlign: 'start',
					textBaseline: 'top',
					fill: 'rgba(0,0,0,0.65)',
				},
			})

			// initial icon
			const isInitial = model.initial || this.initial || false
			group.addShape('image', {
				attrs: {
					img: isInitial ? '/assets/icons/initial-state.svg' : null,
					x: x - 10 + width / 2,
					y: y - 40,
					width: 19,
					height: 40,
				},
			})

			return keyShape
		},
		anchor: [[0.5, 0], [0.5, 1]],
	})
}
