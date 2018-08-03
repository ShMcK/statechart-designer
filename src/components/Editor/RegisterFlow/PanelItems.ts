import anchor from './anchor'

export const items = [
	{
		key: 'state',
		size: '170*34',
		label: 'State',
		class: 'pannel-type-icon',
		typeIconUrl: '/assets/icons/state.svg',
		stateIconUrl: '/assets/icons/icon1.svg',
		anchor,
	},
	{
		key: 'history',
		size: '170*34',
		label: 'History',
		class: 'pannel-type-icon',
		typeIconUrl: '/assets/icons/state.svg',
		stateIconUrl: '/assets/icons/icon2.svg',
		anchor,
	},
]

export default (Flow: any) => {
	items.forEach((item) => {
		Flow.registerNode(
			item.key,
			{
				label: item.label,
				type_icon_url: item.typeIconUrl,
				state_icon_url: item.stateIconUrl,
				anchor: item.anchor,
			},
			'model-card',
		)
	})
}
