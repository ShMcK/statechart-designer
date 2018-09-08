import { IData, IGraph, IGroup, INode } from '@antv/g6' // IGroup
import { createStatefulMachine } from '@avaragado/xstateful'
import { Button } from 'antd'
import * as React from 'react'
import { exportToXState } from 'utils/export'
import { load } from 'utils/storage'
import { Machine } from 'xstate'
import ErrorPage from '../../ErrorPage'

interface IProps {
	flow: IGraph
}

export default class StateNavigator extends React.Component<IProps> {
	state = {
		error: null,
		edges: [],
		state: null,
	}

	xsf: any
	flow: any
	allNodes: Array<INode | IGroup>

	setupStateMachine = async () => {
		try {
			this.allNodes = [
				...this.props.flow.getNodes(),
				...this.props.flow.getGroups(),
			]
			const data: IData = await load()
			const xstate = exportToXState(data)
			const machine = Machine(xstate)
			this.xsf = createStatefulMachine({ machine })
			this.xsf.init()
			this.setState({ error: null })
			this.next()
		} catch (error) {
			this.setState({ error: error.message })
		}
	}
	setNode = (node: INode | IGroup) => {
		this.setState({ node })
		this.props.flow.clearSelected()
		this.props.flow.setSelected(node, true)
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
		if (!this.state.error) {
			const node = this.getNode()
			this.getEdges(node)
			this.setNode(node)
		}
	}
	reset = () => {
		this.xsf.init()
		this.next()
	}
	render() {
		if (this.state.error) {
			return <ErrorPage>{this.state.error}</ErrorPage>
		}
		return (
			<React.Fragment>
				<div>
					<div className="pannel-title">Transitions</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						{this.state.edges.map((label) => (
							<Button
								style={{ margin: 5 }}
								key={label}
								onClick={() => this.transition(label)}>
								{label}
							</Button>
						))}
					</div>
				</div>

				<div>
					<div className="pannel-title">Actions</div>
				</div>

				<div>
					<div className="pannel-title">Options</div>
					<Button type="primary" onClick={this.reset} style={{ margin: 5 }}>
						Reset
					</Button>
				</div>
			</React.Fragment>
		)
	}
}
