interface INode {
	shape: string
	type: string
	id: string
	index: number
	label: string
}

interface IEdge {
	source: string
	target: string
	id: string
	index: number
	label: string
}

interface IXState {
	initial?: string
	states?: any
}

export const exportToXState = (data: any) => {
	// normalize nodes & edges
	const nodes = {}
	const edges = {}

	// xstate setup
	const xstate: IXState = {
		states: {},
	}

	// normalize nodes
	data.nodes.forEach((node: INode) => {
		nodes[node.id] = node
	})

	// if no initial, use index 0 node
	const initial: INode = data.nodes[0]
	xstate.initial = initial.label
	xstate.states[initial.label] = {}

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
			xstate.states[edge.target] = {}
		})
	}

	xstate.states = {
		[data.nodes[0].label]: {},
	}
	return xstate
}
