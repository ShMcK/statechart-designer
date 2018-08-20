import { IData, IGroup, INode } from '@antv/g6' // IGroup
import { createStatefulMachine } from '@avaragado/xstateful'
import { Button } from 'antd'
import * as React from 'react'
import { exportToXState } from 'utils/export'
import { load } from 'utils/storage'
import { Machine } from 'xstate'

interface IProps {
	getFlow(): any
}

export default class StateNavigator extends React.Component<IProps> {
	state = {
		edges: [],
		state: null,
	}

	xsf: any
	flow: any
	allNodes: Array<INode | IGroup>

	async componentDidMount() {
		await this.setupStateMachine()
		this.flow = this.props.getFlow()
		this.allNodes = [...this.flow.getNodes(), ...this.flow.getGroups()]

		this.next()
	}
	setupStateMachine = async () => {
		const data: IData = await load()
		const xstate = exportToXState(data)
		const machine = Machine(xstate)
		this.xsf = createStatefulMachine({ machine })
		this.xsf.init()
	}
	setNode = (node: INode | IGroup) => {
		this.setState({ node })
		this.flow.clearSelected()
		this.flow.setSelected(node, true)
		this.getEdges(node)
	}
	getNode = (): INode | IGroup => {
		const state = this.xsf.state.value
		const node = this.allNodes.find(({ model }: any) => model.label === state)
		if (!node) {
			throw new Error('Node not found')
		}
		return node
	}
	getEdges = (node: INode | IGroup) => {
		const edges = node.getOutEdges()
		this.setState({
			edges: edges.map(({ model }) => model.label),
		})
	}
	transition = (event: string) => {
		this.xsf.transition(event)
		this.next()
	}
	next = () => {
		const node = this.getNode()
		this.getEdges(node)
		this.setNode(node)
	}
	reset = () => {
		this.xsf.init()
		this.next()
	}
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: 5,
					height: window.innerHeight - 96,
				}}>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					{this.state.edges.map((label) => (
						<Button key={label} onClick={() => this.transition(label)}>
							{label}
						</Button>
					))}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" onClick={this.reset}>
						Reset
					</Button>
				</div>
			</div>
		)
	}
}
