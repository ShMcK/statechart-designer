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
	loaded: boolean
	error: string | null
	edges: any[]
	state: any
	node: INode | IGroup | null
	allNodes: Array<INode | IGroup>
}

// external state machine
let xsf: any

export default class StateNavigator extends React.Component<IProps, IState> {
	static getDerivedStateFromProps = async (props: IProps, state: IState) => {
		if (props.flow && (!state.allNodes || !state.allNodes.length)) {
			try {
				console.log(props)
				const allNodes = [...props.flow.getNodes(), ...props.flow.getGroups()]
				console.log({ allNodes })
				const data: IData = await load()
				console.log({ data })
				setTimeout(() => {
					const xstate = exportToXState(data)
					const machine = Machine(xstate)
					xsf = createStatefulMachine({
						machine,
					})
					xsf.init()
				}, 1000)
				return { error: null, allNodes }
			} catch (error) {
				return { error: error.message }
			}
		}
		return null
	}
	state = {
		loaded: false,
		error: null,
		edges: [],
		state: null,
		allNodes: [],
		node: null,
	}

	setNode = (node: INode | IGroup) => {
		this.setState({ node })
		this.props.flow.clearSelected()
		this.props.flow.setSelected(node, true)
		this.getEdges(node)
	}
	getNode = (): INode | IGroup | null => {
		const currentNode = xsf.state.value
		console.log('state', currentNode, this.state.allNodes)
		const node = this.state.allNodes.find(
			({ model }: any) => model.label === currentNode,
		)
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
		if (this.props.flow) {
			console.log(this.props.flow.getNodes())
		}
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
