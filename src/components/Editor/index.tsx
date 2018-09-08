import { IGraph } from '@antv/g6'
import { IEditor } from '@antv/g6-editor'
import * as React from 'react'

import createEditor from 'services/editor/createEditor'
import './editor.css'
import editorConfig from './editorConfig'
import './modelFlowEditor.css'
// import registerFlow from './RegisterFlow'
// import { items } from './RegisterFlow/PanelItems'

import { load } from '../../utils/storage'
import ContextMenu from './ContextMenu'

import Page from './Page'
import SidePanel from './SidePanel'
import Toolbar from './Toolbar'

interface IState {
	selectedModel: any
	tempModel: any | null
}

class Editor extends React.Component<{}, IState> {
	flow: IGraph
	editor: IEditor
	state = {
		selectedModel: {},
		tempModel: null,
	}
	componentDidMount() {
		const { editor, page } = createEditor(editorConfig)
		console.log(editor, page)
		this.editor = editor
		this.flow = page
		// registerFlow()
		this.forceUpdate()
		// load saved data
		this.load()
	}

	componentWillUnmount() {
		// this.editor.destroy()
	}

	load = async () => {
		const loaded = (await load()) || {}
		console.log('loaded', loaded)
		// this.flow.read(loaded)
	}

	onChange = (change: any) => {
		this.setState(change)
	}
	render() {
		const { tempModel, selectedModel } = this.state
		const model = tempModel !== null ? tempModel : selectedModel
		return (
			<div id="editor">
				<Toolbar />
				<div style={{ height: '42px' }} />
				<div className="bottom-container">
					<ContextMenu />
					<SidePanel
						// flow={this.flow}
						onChange={this.onChange}
						editor={this.editor}
						model={model}
					/>
					<Page />
				</div>
			</div>
		)
	}
}

export default Editor
