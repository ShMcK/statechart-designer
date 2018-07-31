import { IData, IEdge, INode } from '../../../typings/g6-editor/data' // IGroup
import { StateNodeConfig } from '../../../typings/xstate/index'

import { getEdgesByNode, getInitial } from './utils'

export const exportToXState = (data: IData) => {
	// normalize nodes & edges
	const nodes: { [key: string]: INode } = {}
	const edges: { [key: string]: IEdge } = {}
	// const groups: { [key: string]: IGroup } = {}

	// xstate setup
	const xstate: StateNodeConfig = {
		states: {},
	}

	if (!data.nodes) {
		return xstate
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

	// normalize edges
	data.edges.forEach((edge: IEdge) => {
		edges[edge.id] = edge
	})

	// use edges to find other nodes
	// breadth first
	const nodeEdges = getEdgesByNode(data, data.nodes[0])

	if (!nodeEdges) {
		return xstate
	}

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
