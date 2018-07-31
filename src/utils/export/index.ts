import { IData, IEdge, INode } from '../../../typings/g6-editor/data'
import { StateNodeConfig } from '../../../typings/xstate/index'

import { getEdgesByNode, getInitial } from './utils'

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

	const initial: INode = getInitial(data)

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

	const nodeEdges = getEdgesByNode(data, data.nodes[0])

	nodeEdges.forEach((edge: IEdge) => {
		if (xstate.states) {
			xstate.states[edge.target] = {}
		}
	})

	xstate.states = {
		[data.nodes[0].label]: {},
	}
	return xstate
}
