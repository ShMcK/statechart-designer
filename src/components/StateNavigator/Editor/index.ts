import { IGraph } from '@antv/g6'
import G6Editor, { IEditor } from '@antv/g6-editor'

const initEditorComponents = () => {
	const editor: IEditor = new G6Editor()

	const minimap = new G6Editor.Minimap({
		container: 'minimap',
		height: 120,
		width: 200,
	})

	const page: IGraph = new G6Editor.Flow({
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
	})

	editor.add(minimap)
	editor.add(page)

	editor.on('aftercommandexecute', (ev: { command: any }) => {
		switch (ev.command.name) {
			case 'addGroup':
				const groupId = ev.command.addGroupId
				page.clearSelected()
				page.setSelected(groupId, true)

			default:
				return
		}
	})

	return { editor, page }
}

export default initEditorComponents
