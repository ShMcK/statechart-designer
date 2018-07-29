import G6Editor from '@antv/g6-editor'
import items from './items'

const Flow = G6Editor.Flow

Flow.registerNode('model-card', {
	draw(item) {
		const group = item.getGraphicGroup()
		const model = item.getModel()
		const width = 184
		const height = 40
		const x = -width / 2
		const y = -height / 2
		const borderRadius = 4

		// outline shape when drawing
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

		const label = model.label ? model.label : this.label

		const shapes = [
			{
				type: 'path',
				attrs: {
					path: [
						['M', x, y + borderRadius],
						['L', x, y + height - borderRadius],
						[
							'A',
							borderRadius,
							borderRadius,
							0,
							0,
							0,
							x + borderRadius,
							y + height,
						],
						['L', x + borderRadius, y],
						['A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius],
					],
					fill: this.color_type,
				},
			},
			{
				type: 'image',
				attrs: {
					img: this.type_icon_url,
					x: x + 16,
					y: y + 12,
					width: 20,
					height: 16,
				},
			},
			{
				type: 'image',
				attrs: {
					img: this.state_icon_url,
					x: x + 158,
					y: y + 12,
					width: 16,
					height: 16,
				},
			},
			{
				type: 'text',
				attrs: {
					text: label,
					x: x + 52,
					y: y + 13,
					textAlign: 'start',
					textBaseline: 'top',
					fill: 'rgba(0,0,0,0.65)',
				},
			},
		]

		shapes.forEach(({ type, ...rest }) => {
			group.addShape(type, rest)
		})

		return keyShape
	},
	// 设置锚点
	anchor: [
		[0.5, 0], // 上面边的中点
		[0.5, 1], // 下边边的中点
	],
})

items.forEach((item) => {
	Flow.registerNode(
		item.key,
		{
			label: item.label,
			color_type: item.color,
			type_icon_url: item.typeIconUrl,
			state_icon_url: item.stateIconUrl,
			anchor: item.anchor,
		},
		'model-card',
	)
})
