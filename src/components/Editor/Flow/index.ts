import G6Editor from '@antv/g6-editor'

import items from './items'
import shapes from './shapes'

const Flow = G6Editor.Flow

export default () => {
	shapes.forEach((shape) => {
		Flow.registerNode(...shape)
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
}
