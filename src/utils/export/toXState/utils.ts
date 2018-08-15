import { IData, IEdge, IGroup, ILabel, INode } from '@antv/g6'

export function getStart(allNodes: Array<INode | IGroup>): INode | IGroup {
	const rootNodes = allNodes.filter(
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
export function getEdgesByNode(
	data: IData,
	node: INode | IGroup,
): IEdge[] | null {
	if (!data.edges) {
		return null
	}
	return data.edges.filter((edge: IEdge) => edge.source === node.id)
}

export function getLabel(label: ILabel): string {
	switch (typeof label) {
		case 'object':
			return label.text ? label.text : ''
		case 'string':
			return label
		default:
			return ''
	}
}
