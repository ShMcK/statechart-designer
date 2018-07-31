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
	xstate.states = {
		[initial.label]: {},
	}

	const traversedStates = {}
	const untraversedStateIds: string[] = [initial.id]

	// if no edges, cannot continue
	if (!data.edges) {
		return xstate
	}

	// normalize edges
	data.edges.forEach((edge: IEdge) => {
		edges[edge.id] = edge
	})

	function traverseEdges(edgeList: IEdge[]): void {
		edgeList.forEach((edge: IEdge) => {
			if (xstate.states) {
				// add state
				const target = nodes[edge.target].label
				xstate.states[target] = xstate.states[target] || {}
				untraversedStateIds.push(edge.target)

				// add state.on
				const source = nodes[edge.source].label
				xstate.states[source].on = {
					...xstate.states[source].on,
					[edge.label]: target,
				}
			}
		})
	}

	function traverseNode(node: INode) {
		if (!traversedStates[node.id]) {
			const nodeEdges = getEdgesByNode(data, node)
			if (!nodeEdges) {
				return xstate
			}
			traversedStates[node.id] = true
			traverseEdges(nodeEdges)
		}
	}

	// use edges to find other nodes
	// breadth first
	while (untraversedStateIds.length) {
		const nextId: string = untraversedStateIds.shift() || ''
		const node = nodes[nextId]
		traverseNode(node)
	}

	return xstate
}
