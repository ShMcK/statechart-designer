import { IData, IGraph, IGroup, INode } from '@antv/g6' // IGroup
import { createStatefulMachine } from '@avaragado/xstateful'
import { Button } from 'antd'
import * as React from 'react'

import { ButtonOptions, Title } from 'components/Panel'

import ErrorPage from 'components/ErrorPage'
import { exportToXState } from 'utils/export'
import { load } from 'utils/storage'
import { Machine } from 'xstate'

interface IProps {
	flow: IGraph
}

interface IState {
	error: string | null
	edges: any[]
	state: any
	node: INode | IGroup | null
	allNodes: Array<INode | IGroup>
}

// external state machine
let xsf: any

export default class StateNavigator extends React.Component<IProps, IState> {
	state = {
		error: null,
		edges: [],
		state: null,
		allNodes: [],
		node: null,
	}
	async componentDidMount() {
		const data: IData = await load()
		const xstate = exportToXState(data)
		const machine = Machine(xstate)
		xsf = createStatefulMachine({ machine })
		xsf.init()
		const { flow } = this.props
		const allNodes = [...flow.getNodes(), ...flow.getGroups()]
		this.setState({ allNodes })
		this.next()
	}

	setNode = (node: INode | IGroup) => {
		this.setState({ node })
		this.props.flow.clearSelected()
		this.props.flow.setSelected(node, true)
		this.getEdges(node)
	}
	getNode = (): INode | IGroup | null => {
		const currentNode = xsf.state.value
		const node = this.state.allNodes.find(({ id }: any) => id === currentNode)
		if (!node) {
			this.setState({ error: 'Node not found' })
			return null
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
		xsf.transition(event)
		this.next()
	}
	next = () => {
		if (!this.state.error) {
			const node = this.getNode()
			if (node) {
				this.getEdges(node)
				this.setNode(node)
			}
		}
	}
	reset = () => {
		xsf.init()
		this.next()
	}
	render() {
		if (this.state.error) {
			return <ErrorPage>{this.state.error}</ErrorPage>
		}
		return (
			<React.Fragment>
				<div>
					<Title>Transitions</Title>
					<ButtonOptions>
						{this.state.edges.map((label) => (
							<Button
								style={{ margin: 5 }}
								key={label}
								onClick={() => this.transition(label)}>
								{label}
							</Button>
						))}
					</ButtonOptions>
				</div>

				<div>
					<Title>Actions</Title>
				</div>

				<div>
					<Title>Options</Title>
					<ButtonOptions>
						<Button type="primary" onClick={this.reset} style={{ margin: 5 }}>
							Reset
						</Button>
					</ButtonOptions>
				</div>
			</React.Fragment>
		)
	}
}
