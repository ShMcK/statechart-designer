import { IData, IEdge, INode } from '@antv/g6' // IGroup
import { StateNodeConfig } from 'typings/xstate'

import { getEdgesByNode, getLabel, getStart } from './utils'

export default (data: IData) => {
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

	const initial: INode = getStart(data)
	const label = getLabel(initial.label)
	xstate.initial = label
	xstate.states = {
		[label]: {},
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

	function traverseNode(node: INode): void {
		if (!traversedStates[node.id]) {
			const nodeEdges = getEdgesByNode(data, node)
			if (!nodeEdges) {
				return
			}
			traversedStates[node.id] = true
			traverseEdges(nodeEdges)
		}
		return
	}

	// use edges to find other nodes
	// breadth first traversal
	while (untraversedStateIds.length) {
		const nextId: string = untraversedStateIds.shift() || ''
		const node = nodes[nextId]
		traverseNode(node)
	}

	return xstate
}
