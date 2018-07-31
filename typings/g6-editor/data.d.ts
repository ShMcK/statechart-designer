export interface IData {
	nodes: INode[]
	edges?: IEdge[]
	groups?: IGroup[]
}

export interface INode {
	id: string
	index: number
	shape: string
	type: string
	label: string
	initialNode?: boolean
}

export interface IEdge {
	id: string
	index: number
	label: string
	source: string
	target: string
}

export interface IGroup {
	id: string
	index: number
	label: string
	collapsed: boolean
	x: number
	y: number
}
