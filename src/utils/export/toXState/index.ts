import { IData, IEdge, IGroup, INode } from '@antv/g6' // IGroup
import { get, set } from 'lodash'

import { getEdgesByNode, getLabel, getStart } from './utils'

export default (data: IData) => {
	data.edges = data.edges || []
	data.groups = data.groups || []

	// normalize nodes & edges
	const nodesById: { [key: string]: INode | IGroup } = {}
	const edgesById: { [key: string]: IEdge } = {}

	// xstate setup
	const xstate: any = {
		states: {},
	}

	if (!data.nodes) {
		return xstate
	}

	// normalize nodes
	const allNodes: Array<INode | IGroup> = [...data.nodes, ...data.groups]
	allNodes.forEach((node: INode) => {
		nodesById[node.id] = node
	})

	const start: INode | IGroup = getStart(allNodes)

	// collect nodes to avoid calling a node twice
	const traversedStates = new Set()

	// if no edges, cannot continue
	if (!data.edges) {
		return xstate
	}

	// normalize edges
	data.edges.forEach((edge: IEdge) => {
		edgesById[edge.id] = edge
	})

	function traverseEdges(edgeList: IEdge[], path: string[]): void {
		edgeList.forEach((edge: IEdge) => {
			if (xstate.states) {
				// add state
				const target: string = nodesById[edge.target].label || ''
				if (!get(xstate, [...path, target])) {
					set(xstate, [...path, target], {})
				}
				const nextNode = allNodes.find((n) => n.id === edge.target)
				if (nextNode) {
					traverseNode(nextNode, path)
				}

				// add state.on
				const source: string = nodesById[edge.source].label || ''
				set(xstate, [...path, source, 'on', edge.label], target)
			}
		})
	}

	function traverseNode(
		node: INode | IGroup,
		path: string[] = ['states'],
	): void {
		// node has not been checked yet
		if (!traversedStates.has(node.id)) {
			traversedStates.add(node.id)

			const label = getLabel(node.label)

			if (!get(xstate, [...path, label])) {
				set(xstate, [...path, label], {})
			}

			// set initial state
			if (node.initial) {
				set(xstate, [...path.slice(0, path.length - 1), 'initial'], node.label)
			}

			// traverse children
			const isGroup = !node.hasOwnProperty('type')
			if (isGroup) {
				const childNodes = allNodes.filter((n) => n.parent === node.id)
				childNodes.forEach((n) => {
					traverseNode(n, [...path, label, 'states'])
				})
			}

			// TODO: traverse parent

			// traverse edges
			const nodeEdges = getEdgesByNode(data, node)
			traverseEdges(nodeEdges || [], path)
		}
		return
	}

	traverseNode(start)

	return xstate
}
