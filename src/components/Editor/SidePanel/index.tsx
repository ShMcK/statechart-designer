import { IGraph } from '@antv/g6'
import { IEditor } from '@antv/g6-editor'
import { Icon, Tabs } from 'antd'
import * as React from 'react'

import PageNavigator from '../../PageNavigator'
import * as Details from '../Details'
// import JSONEditor from '../JSONEditor'

const TabPane = Tabs.TabPane

interface IProps {
	editor: IEditor
	flow: IGraph
	model: any
	onChange(change: any): void
}

export default class SidePanel extends React.Component<IProps> {
	stateNavigator: any = React.createRef()
	toggleGrid = (ev: any) => {
		if (ev.target.checked) {
			this.props.flow.showGrid()
		} else {
			this.props.flow.hideGrid()
		}
	}
	updateGraph = (key: string, value: any) => {
		this.props.editor.executeCommand(() => {
			const selectedItems = this.props.flow.getSelected()
			selectedItems.forEach((item: any) => {
				const updateModel = {}
				updateModel[key] = value
				this.props.flow.update(item, updateModel)
			})
		})
	}
	onTabChange = (activeKey: string) => {
		if (activeKey !== '1') {
			this.props.flow.clearSelected()
		}
	}
	render() {
		return (
			<div id="sidepannel">
				<Tabs
					type="line"
					size="small"
					defaultActiveKey="info"
					onChange={this.onTabChange}>
					<TabPane tab={<Icon type="info-circle" />} key="info">
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: window.innerHeight - 82,
								marginTop: '-15px',
								justifyContent: 'space-between',
							}}>
							<div id="detailpannel">
								<div
									data-status="node-selected"
									className="pannel"
									id="node_detailpannel">
									<div className="pannel-title">State</div>
									<div className="block-container">
										<Details.State
											model={this.props.model}
											onChange={this.props.onChange}
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
											model={this.props.model}
											onChange={this.props.onChange}
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
											model={this.props.model}
											onChange={this.props.onChange}
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
							<div style={{ alignSelf: 'flex-end' }}>
								<PageNavigator flow={this.props.flow} />
							</div>
						</div>
					</TabPane>
					<TabPane tab={<Icon type="code" />} key="code" disabled={false}>
						{/* <JSONEditor getFlow={() => this.props.flow} /> */}
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
