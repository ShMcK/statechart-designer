import G6Editor, { IEditor } from '@antv/g6-editor'

interface IConfig {
	elements: any
	commands: any
	page: any
}

const initEditorComponents = (config: IConfig) => {
	// create editor
	const editor: IEditor = new G6Editor()

	// create a page/flow editor
	const page = new G6Editor.Flow({
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

	// editor elements
	for (const element of config.elements()) {
		editor.add(element)
	}

	// editor events
	for (const [event, fn] of config.commands(page)) {
		editor.on(event, fn, page)
	}

	// // page/flow events
	for (const [event, fn] of config.page(page)) {
		page.on(event, fn)
	}

	return { editor, page }
}

export default initEditorComponents
