export default [
	[
		'model-card',
		{
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

				const shapes = [
					{
						// color label for state
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
							label: '文本标签',
						},
					},
					{
						// left icon
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
						// right icon
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
						// state title
						type: 'text',
						attrs: {
							text: model.label ? model.label : this.label || 'state',
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
			anchor: [[0.5, 0], [0.5, 1]],
		},
	],
]
