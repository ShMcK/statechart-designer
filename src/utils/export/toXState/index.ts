import { IData, IEdge, IGroup, INode } from '@antv/g6' // IGroup
import { StateNodeConfig } from 'typings/xstate'

import { getEdgesByNode, getLabel, getStart } from './utils'

export default (data: IData) => {
	data.edges = data.edges || []
	data.groups = data.groups || []

	// normalize nodes & edges
	const states: { [key: string]: INode | IGroup } = {}
	const events: { [key: string]: IEdge } = {}

	// xstate setup
	const xstate: StateNodeConfig = {
		states: {},
	}

	if (!data.nodes) {
		return xstate
	}

	// normalize nodes
	data.nodes.forEach((node: INode) => {
		states[node.id] = node
	})

	const allNodes: Array<INode | IGroup> = [...data.nodes, ...data.groups]

	const initial: INode | IGroup = getStart(allNodes)
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
		events[edge.id] = edge
	})

	function traverseEdges(edgeList: IEdge[]): void {
		edgeList.forEach((edge: IEdge) => {
			if (xstate.states) {
				// add state
				const target: string = states[edge.target].label || ''
				xstate.states[target] = xstate.states[target] || {}
				untraversedStateIds.push(edge.target)

				// add state.on
				const source: string = states[edge.source].label || ''
				xstate.states[source].on = {
					...xstate.states[source].on,
					[edge.label]: target,
				}
			}
		})
	}

	function traverseNode(node: INode | IGroup): void {
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
		const node = states[nextId]
		traverseNode(node)
	}

	return xstate
}
