import G6Editor from '@antv/g6-editor'

const initEditorComponents = (page: any) => {
	const editor = new G6Editor()

	const minimap = new G6Editor.Minimap({
		container: 'minimap',
		height: 120,
		width: 200,
	})

	const toolbar = new G6Editor.Toolbar({
		container: 'toolbar',
	})

	const contextmenu = new G6Editor.Contextmenu({
		container: 'contextmenu',
	})

	const itempannel = new G6Editor.Itempannel({
		container: 'itempannel',
	})

	const detailpannel = new G6Editor.Detailpannel({
		container: 'detailpannel',
	})

	editor.add(minimap)
	editor.add(toolbar)
	editor.add(contextmenu)
	editor.add(itempannel)
	editor.add(detailpannel)
	editor.add(page)

	editor.on('aftercommandexecute', (ev: any) => {
		switch (ev.command.name) {
			case 'addGroup':
				console.log('group!', ev)
				const groupId = ev.command.addGroupId
				page.clearSelected()
				page.setSelected(groupId, true)

			default:
				return
		}
	})

	return editor
}

export default initEditorComponents
