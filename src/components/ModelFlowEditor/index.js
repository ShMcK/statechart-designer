import React from 'react'
import { Checkbox } from 'antd'

import './modelFlowEditor.css'
import './Cards'
import items from './items'
import Editor from '../Editor'
import Navigator from '../Navigator'
import Toolbar from '../Toolbar'
import ContextMenu from '../ContextMenu'
import Page from '../Page'

import DetailsCanvas from './Details/Canvas'
import DetailsState from './Details/State'
import DetailsTransition from './Details/State'

class ModelFlowEditor extends Editor {
	componentDidMount() {
		setTimeout(() => {
			super.componentDidMount()
			const page = this.page

			// 输入锚点不可以连出边
			page.on('hoveranchor:beforeaddedge', (ev) => {
				if (ev.anchor.type === 'input') {
					ev.cancel = true
				}
			})
			page.on('dragedge:beforeshowanchor', (ev) => {
				// 只允许目标锚点是输入，源锚点是输出，才能连接
				if (
					!(
						ev.targetAnchor.type === 'input' &&
						ev.sourceAnchor.type === 'output'
					)
				) {
					ev.cancel = true
				}
				// 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
				if (
					ev.dragEndPointType === 'target' &&
					page.anchorHasBeenLinked(ev.target, ev.targetAnchor)
				) {
					ev.cancel = true
				}
				// 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
				if (
					ev.dragEndPointType === 'source' &&
					page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)
				) {
					ev.cancel = true
				}
			})
		}, 100)
	}
	render() {
		const {
			curZoom,
			minZoom,
			maxZoom,
			inputingLabel,
			selectedModel,
		} = this.state
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
									label={
										inputingLabel !== null ? inputingLabel : selectedModel.label
									}
									onChange={(change) => this.setState(change)}
									updateGraph={(k, v) => this.updateGraph(k, v)}
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
									label={
										inputingLabel !== null ? inputingLabel : selectedModel.label
									}
									onChange={(change) => this.setState(change)}
									updateGraph={(k, v) => this.updateGraph(k, v)}
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
									label={
										inputingLabel !== null ? inputingLabel : selectedModel.label
									}
									onChange={(change) => this.setState(change)}
									updateGraph={(k, v) => this.updateGraph(k, v)}
								/>
							</div>
						</div>
						<div
							data-status="canvas-selected"
							className="pannel"
							id="canvas_detailpannel">
							<div className="pannel-title">Canvas</div>
							<div className="block-container">
								<DetailsCanvas toggleGrid={this.toggleGrid.bind(this)} />
							</div>
						</div>
					</div>
					<Navigator
						curZoom={curZoom}
						minZoom={minZoom}
						maxZoom={maxZoom}
						changeZoom={this.changeZoom.bind(this)}
					/>
					<Page />
				</div>
			</div>
		)
	}
}

export default ModelFlowEditor
