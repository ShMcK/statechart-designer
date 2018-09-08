import G6Editor from '@antv/g6-editor'

export default {
	elements: [
		new G6Editor.Flow({
			align: {
				grid: true,
			},
			edgeResizeable: false,
			graph: {
				container: 'page',
				height: window.innerHeight - 38,
				fitView: 'cc',
			},
			noEndEdge: false,
		}),
		new G6Editor.Minimap({
			container: 'minimap',
			height: 120,
			width: 200,
		}),
	],
	commands: (page: any) => [
		[
			'aftercommandexecute',
			(ev: { command: any }) => {
				switch (ev.command.name) {
					case 'addGroup':
						const groupId = ev.command.addGroupId
						page.clearSelected()
						page.setSelected(groupId, true)

					default:
						return
				}
			},
		],
	],
	page: (page: any) => [],
}
