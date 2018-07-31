export interface IData {
	nodes: INode[]
	edges?: IEdge[]
}

export interface INode {
	shape: string
	type: string
	id: string
	index: number
	label: string
	initialNode?: boolean
}

export interface IEdge {
	source: string
	target: string
	id: string
	index: number
	label: string
}

export interface IGroup {}
