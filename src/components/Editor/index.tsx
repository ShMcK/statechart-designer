import * as React from 'react'

import './editor.css'
import './modelFlowEditor.css'
import registerFlow from './RegisterFlow'
import { items } from './RegisterFlow/PanelItems'

import { load } from '../../utils/storage'
import ContextMenu from '../ContextMenu'
import Navigator from '../Navigator'
import Page from '../Page'
import Toolbar from '../Toolbar'
import * as Details from './Details'
import initEditor from './Editor'
import initFlow from './Flow'
import Zoom from './Zoom'

interface IState {
	selectedModel: any
	tempModel: any | null
}

class Editor extends React.Component<{}, IState> {
	flow: any
	editor: any
	state = {
		selectedModel: {},
		tempModel: null,
	}
	componentDidMount() {
		const flow = initFlow(this.onChange)
		const editor = initEditor(flow)
		this.flow = flow
		this.editor = editor
		registerFlow()
		// load saved data
		this.load()
	}

	componentWillUnmount() {
		this.editor.destroy()
	}

	load = async () => {
		const loaded = (await load()) || {}
		console.log('loaded', loaded)
		this.flow.read(loaded)
	}

	toggleGrid = (ev: any) => {
		if (ev.target.checked) {
			this.flow.showGrid()
		} else {
			this.flow.hideGrid()
		}
	}
	updateGraph = (key: string, value: any) => {
		this.editor.executeCommand(() => {
			const selectedItems = this.flow.getSelected()
			selectedItems.forEach((item: any) => {
				const updateModel = {}
				updateModel[key] = value
				this.flow.update(item, updateModel)
			})
		})
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
					<div id="itempannel">
						<ul>
							{items.map((item: any) => (
								<li
									key={item.key}
									className="getItem"
									data-shape={item.key}
									data-type="node"
									data-size={item.size}>
									<span className={item.class} />
									{item.label}
								</li>
							))}
						</ul>
					</div>
					<div id="detailpannel">
						<div
							data-status="node-selected"
							className="pannel"
							id="node_detailpannel">
							<div className="pannel-title">State</div>
							<div className="block-container">
								<Details.State
									model={model}
									onChange={this.onChange}
									updateGraph={this.updateGraph}
								/>
							</div>
						</div>
						<div
							data-status="edge-selected"
							className="pannel"
							id="edge_detailpannel">
							<div className="pannel-title">Transition</div>
							<div className="block-container">
								<Details.Transition
									model={model}
									onChange={this.onChange}
									updateGraph={this.updateGraph}
								/>
							</div>
						</div>
						<div
							data-status="group-selected"
							className="pannel"
							id="node_detailpannel">
							<div className="pannel-title">Group</div>
							<div className="block-container">
								<Details.Group
									model={model}
									onChange={this.onChange}
									updateGraph={this.updateGraph}
								/>
							</div>
						</div>
						<div
							data-status="canvas-selected"
							className="pannel"
							id="canvas_detailpannel">
							<div className="pannel-title">Canvas</div>
							<div className="block-container">
								<Details.Canvas toggleGrid={this.toggleGrid} />
							</div>
						</div>
					</div>
					<Zoom changeZoom={(zoom: number) => this.flow.zoom(zoom)}>
						{({ zoom, minZoom, maxZoom, changeZoom }: any) => (
							<Navigator
								zoom={zoom}
								minZoom={minZoom}
								maxZoom={maxZoom}
								changeZoom={changeZoom}
							/>
						)}
					</Zoom>
					<Page />
				</div>
			</div>
		)
	}
}

export default Editor
