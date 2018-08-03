import { IData, IEdge, INode } from '../../../../typings/g6-editor/data'

export function getStart(data: IData): INode {
	const rootNodes = data.nodes.filter(
		(node: INode) => node.initial === true && !node.parent,
	)
	if (rootNodes.length > 1) {
		throw new Error('Too many initial start states')
	} else if (!rootNodes.length) {
		throw new Error('No initial starting state')
	} else {
		return rootNodes[0]
	}
}

// for each node, search its edges as source
export function getEdgesByNode(data: IData, node: INode): IEdge[] | null {
	if (!data.edges) {
		return null
	}
	return data.edges.filter((edge: IEdge) => edge.source === node.id)
}
