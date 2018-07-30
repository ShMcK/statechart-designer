import G6Editor from '@antv/g6-editor'

import items from './items'
import stateContainer from './stateContainer'

const Flow = G6Editor.Flow

export default () => {
	stateContainer.forEach((item) => {
		Flow.registerNode(...item)
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
