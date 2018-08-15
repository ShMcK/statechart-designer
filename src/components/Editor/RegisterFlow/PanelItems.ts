import { IAnchor } from '@antv/g6'
import { IFlow } from '@antv/g6-editor'
import anchor from './anchor'

interface IPanelItem {
	key: string
	size: string
	label: string
	class: string
	anchor: IAnchor[]
}

export const items: IPanelItem[] = [
	{
		key: 'state',
		size: '170*34',
		label: 'State',
		class: 'pannel-type-icon',
		anchor,
	},
]

export default (Flow: IFlow) => {
	items.forEach((item: IPanelItem) => {
		Flow.registerNode(
			item.key,
			{
				label: item.label,
				anchor: item.anchor,
			},
			'model-card',
		)
	})
}
