import { StateNodeConfig } from '../../../typings/xstate'

interface IData {
	nodes: INode[]
	edges: IEdge[]
}

interface INode {
	shape: string
	type: string
	id: string
	index: number
	label: string
	initialNode?: boolean
}

interface IEdge {
	source: string
	target: string
	id: string
	index: number
	label: string
}

export const exportToXState = (data: IData) => {
	// normalize nodes & edges
	const nodes = {}
	const edges = {}

	// xstate setup
	const xstate: StateNodeConfig = {
		states: {},
	}

	// normalize nodes
	data.nodes.forEach((node: INode) => {
		nodes[node.id] = node
	})

	// if no initial, use index 0 node
	function getInitial(): INode {
		const hasInitialNode = data.nodes.find(
			(node: INode) => node.initialNode === true,
		)
		if (hasInitialNode) {
			return hasInitialNode
		}
		return data.nodes[0]
	}

	const initial: INode = getInitial()

	xstate.initial = initial.label

	if (xstate.states) {
		xstate.states[initial.label] = {}
	}

	// if no edges, cannot continue
	if (!data.edges) {
		return xstate
	}

	// use edges to find other nodes
	// breadth first

	data.edges.forEach((edge: IEdge) => {
		edges[edge.id] = edge
	})

	// for each node, search its edges as source
	function getEdgesByNode(node: INode) {
		return data.edges.filter((edge: IEdge) => edge.source === node.id)
	}

	if (data.edges) {
		const nodeEdges = getEdgesByNode(data.nodes[0])

		nodeEdges.forEach((edge: IEdge) => {
			if (xstate.states) {
				xstate.states[edge.target] = {}
			}
		})
	}

	xstate.states = {
		[data.nodes[0].label]: {},
	}
	return xstate
}
