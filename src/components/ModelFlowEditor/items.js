const anchor = [
	[0, 0, { type: 'input' }],
	[0, 0, { type: 'output' }],
	[0.5, 0, { type: 'input' }],
	[0.5, 0, { type: 'output' }],
	[1, 0, { type: 'input' }],
	[1, 0, { type: 'output' }],
	[0, 1, { type: 'input' }],
	[0, 1, { type: 'output' }],
	[0.5, 1, { type: 'input' }],
	[0.5, 1, { type: 'output' }],
	[1, 1, { type: 'input' }],
	[1, 1, { type: 'output' }],
]

export default [
	{
		key: 'initial-state',
		size: '170*34',
		label: 'Initial State',
		class: 'pannel-type-icon',
		color: '#1890FF',
		typeIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
		stateIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
		anchor,
	},
	{
		key: 'random-forest',
		size: '170*34',
		label: 'State',
		class: 'pannel-type-icon',
		color: '#9254DE',
		typeIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
		stateIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
		anchor,
	},
	{
		key: 'PS-SMART',
		size: '170*34',
		label: 'Nested State',
		class: 'pannel-type-icon',
		color: '#1890FF',
		typeIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
		stateIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
		anchor,
	},
	{
		key: 'read-data-base',
		size: '170*34',
		label: 'Parallel State',
		class: 'pannel-type-icon',
		color: '#9254DE',
		typeIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
		stateIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
		anchor,
	},
	{
		key: 'history',
		size: '170*34',
		label: 'History',
		class: 'pannel-type-icon',
		color: '#FAAD14',
		typeIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
		stateIconUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
		anchor,
	},
]
