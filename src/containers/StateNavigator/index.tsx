import { IGraph } from '@antv/g6'
import { IEditor } from '@antv/g6-editor'
import * as React from 'react'

import createEditor from 'services/editor/createEditor'
import { load } from 'utils/storage'
import editorConfig from './editorConfig'
import Page from './Page'
import SidePanel from './SidePanel'

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
		pageDisabled: false,
	}
	componentDidMount() {
		const { editor, page } = createEditor(editorConfig, this.onChange)
		this.editor = editor
		this.flow = page

		this.forceUpdate()

		this.load()
	}

	load = async () => {
		// load saved data
		const loaded = (await load()) || {}
		this.flow.read(loaded)
	}

	onChange = (change: any) => {
		this.setState(change)
	}
	render() {
		const { tempModel, selectedModel } = this.state
		const model = tempModel !== null ? tempModel : selectedModel
		return (
			<div id="editor">
				<div className="bottom-container">
					<SidePanel
						flow={this.flow}
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
