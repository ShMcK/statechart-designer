import * as React from 'react'

import './Cards'
// import * as components from './components'
import './editor.css'
import items from './items'
import './modelFlowEditor.css'

import ContextMenu from '../ContextMenu'
import Navigator from '../Navigator'
import Page from '../Page'
import Toolbar from '../Toolbar'
import initEditorComponents from './components'
import DetailsCanvas from './Details/Canvas'
import DetailsState from './Details/State'
import DetailsTransition from './Details/State'

interface IState {
	curZoom: number
	maxZoom: number
	minZoom: number
	selectedModel: object
	tempModel: object | null
}

class Editor extends React.Component<{}, IState> {
	constructor(props) {
		super(props)
		this.state = {
			curZoom: 1, // 当前缩放比率
			maxZoom: 2, // 最大缩放比率s
			minZoom: 0.5, // 最小缩放比率
			tempModel: null,
			selectedModel: {}, // 当前选中项数据模型
		}
	}
	changeZoom = (zoom: number) => {
		this.page.zoom(zoom)
	}
	toggleGrid = (ev) => {
		const { page } = this
		if (ev.target.checked) {
			page.showGrid()
		} else {
			page.hideGrid()
		}
	}
	updateGraph = (key: string, value: any) => {
		const { editor } = this
		editor.executeCommand(() => {
			const { page } = this
			const selectedItems = page.getSelected()
			selectedItems.forEach((item) => {
				const updateModel = {}
				updateModel[key] = value
				page.update(item, updateModel)
			})
		})
	}
	componentDidMount() {
		const { page, editor } = initEditorComponents(this.onChange)
		this.page = page
		this.editor = editor
	}
	onChange = (change) => {
		this.setState(change)
	}
	render() {
		const { curZoom, minZoom, maxZoom, tempModel, selectedModel } = this.state
		const model = tempModel !== null ? tempModel : selectedModel
		return (
			<div id="editor">
				<Toolbar />
				<div style={{ height: '42px' }} />
				<div className="bottom-container">
					<ContextMenu />
					<div id="itempannel">
						<ul>
							{items.map((item) => (
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
								<DetailsState
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
								<DetailsTransition
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
								<DetailsState
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
								<DetailsCanvas toggleGrid={this.toggleGrid} />
							</div>
						</div>
					</div>
					<Navigator
						zoom={curZoom}
						minZoom={minZoom}
						maxZoom={maxZoom}
						changeZoom={this.changeZoom}
					/>
					<Page />
				</div>
			</div>
		)
	}
}

export default Editor
