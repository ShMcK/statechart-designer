import { INode } from '@antv/g6'

// get sibling nodes
export default (id: string, nodes: { [id: string]: INode }) => {
	const { parent } = nodes[id]

	// collect all nodes
	const nodeArray: any[] = []
	Object.keys(nodes).forEach((nodeKey) => {
		if (nodeKey !== id) {
			nodeArray.push(nodes[nodeKey])
		}
	})

	if (!parent) {
		// has no parent, find non-parent matches
		return nodeArray.filter((node: INode) => !node.parent)
	}

	// find parent id matches
	return nodeArray.filter((node: INode) => node.parent === parent)
}
