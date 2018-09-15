import { IGraph } from '@antv/g6'
import G6Editor, { IEditor } from '@antv/g6-editor'

import createFlowGroup from './flowGroup'
import createStateCard from './stateCard'

interface IConfig {
	elements: any
	commands: any
	page: any
}

const initEditorComponents = (
	config: IConfig,
	onChange: (change: any) => void,
) => {
	// create editor
	const editor: IEditor = new G6Editor()

	// create a page/flow editor
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

	// editor elements
	for (const element of [...config.elements(), page]) {
		editor.add(element)
	}

	// editor events
	for (const [event, fn] of config.commands(page, onChange)) {
		editor.on(event, fn)
	}

	// page/flow events
	for (const [event, fn] of config.page(page, onChange)) {
		page.on(event, fn)
	}

	const Flow = G6Editor.Flow

	// edit the group node card
	createFlowGroup(Flow)

	// edit the state node card
	createStateCard(Flow)

	return { editor, page }
}

export default initEditorComponents
