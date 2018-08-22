import { IData, IGroup, INode } from '@antv/g6' // IGroup
import { createStatefulMachine } from '@avaragado/xstateful'
import { Button } from 'antd'
import * as React from 'react'
import { exportToXState } from 'utils/export'
import { load } from 'utils/storage'
import { Machine } from 'xstate'
import ErrorPage from '../ErrorPage'

interface IProps {
	getFlow(): any
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

	componentDidMount() {
		this.flow = this.props.getFlow()
	}
	setupStateMachine = async () => {
		try {
			this.allNodes = [...this.flow.getNodes(), ...this.flow.getGroups()]
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
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: window.innerHeight - 96,
				}}>
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
				<div style={{ margin: 5 }}>
					<Button type="primary" onClick={this.reset}>
						Reset
					</Button>
				</div>
			</div>
		)
	}
}
