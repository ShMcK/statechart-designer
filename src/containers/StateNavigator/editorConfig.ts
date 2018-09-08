import G6Editor from '@antv/g6-editor'

export default {
	elements: () => [
		new G6Editor.Minimap({
			container: 'minimap',
			height: 120,
			width: 200,
		}),
	],
	commands: (page: any) => [],
	page: (page: any) => [],
}
