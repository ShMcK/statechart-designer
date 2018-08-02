import anchor from './anchor'

export default (Flow: any) => {
	Flow.registerGroup('flow-group', {
		draw(this: any, item: any) {
			const model = item.getModel()
			const group = item.getGraphicGroup()
			const childBox = item.getChildrenBBox()
			console.log({ model, group, childBox })
			const padding = 20
			const paddingTop = 30
			const width = childBox.maxX - childBox.minX + padding * 2
			const height = childBox.maxY - childBox.minY + padding * 2 + paddingTop

			// const collapsed = model.collapsed

			// container
			const keyShape = group.addShape('rect', {
				attrs: {
					x: childBox.x - padding,
					y: childBox.y - (padding + paddingTop),
					width,
					height,
					radius: 4,
					fill: '#F7F9FB',
					stroke: '#CED4D9',
				},
			})

			// title
			group.addShape('text', {
				type: 'text',
				attrs: {
					text: model.label ? model.label : this.label || 'Group',
					x: childBox.minX,
					y: childBox.minY,
					textAlign: 'start',
					textBaseline: 'top',
					fill: 'rgba(0,0,0,0.65)',
				},
			})

			return keyShape
		},
		anchor,
	})
}
