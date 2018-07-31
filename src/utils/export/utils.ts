import { IData, IEdge, INode } from '../../../typings/g6-editor/data'

export function getInitial(data: IData): INode {
	const hasInitialNode = data.nodes.find(
		(node: INode) => node.initialNode === true,
	)
	if (hasInitialNode) {
		return hasInitialNode
	}
	return data.nodes[0]
}

// for each node, search its edges as source
export function getEdgesByNode(data: IData, node: INode): IEdge[] | null {
	if (!data.edges) {
		return null
	}
	return data.edges.filter((edge: IEdge) => edge.source === node.id)
}
