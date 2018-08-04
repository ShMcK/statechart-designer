interface IControlPoint {
	x: number
	y: number
}

interface IBoxStyle {
	fill?: string
	stroke?: string
	strokeWeight?: number
}

interface IBoxLabel extends IBoxStyle {
	text: string
}

type IBoxShape = 'rect' | 'circle'

export interface IData {
	nodes: INode[]
	edges?: IEdge[]
	groups?: IGroup[]
	guides?: IGuide[]
}

export interface INode {
	id: string
	index: number
	shape: IBoxShape
	type: string
	label?: string | IBoxLabel
	style: IBoxStyle
	parent?: string
	/* added */
	initial?: boolean
}

export interface IEdge {
	id: string
	source: string
	sourceAnchor: number
	target: string
	targetAnchor: number
	controlPoints?: IControlPoint[]
	index: number
	label?: string | IBoxLabel
	color?: string
	size?: number
	shape: 'line'
	parent?: string
	style?: IBoxStyle
}

export interface IGroup {
	id: string
	color: string
	size: number | number[] // [10, 10]
	shape: IBoxShape
	index: number
	label?: string | IBoxLabel
	style?: IBoxStyle
	parallel?: boolean
	parent?: string
	/* added */
	collapsed?: boolean
	initial?: boolean
}

export interface IGuide {}

export type IEventType = IDOMEvent & IOtherEvent

type IDOMEvent =
	| 'click'
	| 'dblclick'
	| 'mouseenter'
	| 'mouseleave'
	| 'mousedown'
	| 'mouseup'
	| 'mousemove'
	| 'dragstart'
	| 'drag'
	| 'dragend'
	| 'dragenter'
	| 'dragleave'
	| 'drop'
	| 'contextMenu'

type IOtherEvent =
	| 'keydown'
	| 'keyup'
	| 'mousewheel'
	| 'beforechangesize'
	| 'afterchangesize'
	| 'beforeviewportchange'
	| 'afterviewportchange'
	| 'beforechange'
	| 'afterchange'

export type IEventAction = 'add' | 'update' | 'remove' | 'changeData'

export interface IEvent {
	currentItem: any
	currentShape: IBoxShape
	shape: IBoxShape
	item: any
	domEvent: Event
	x: number
	y: number
	domX: number
	domY: number
	action: IEventAction
	toShape: IBoxShape
	toItem: any
}

export type IGraphType = 'node' | 'edge' | 'guide' | 'model'

export type IModel = INode | IEdge | IGroup | IGuide

export interface IItem {
	getModel(): IModel
	getGraphicGroup(): IGroup
	getKeyShape(): object
	getBBox(): object
	getParent(): IItem
	getChildren(): IItem[]
}

export interface IGroupItem {
	getChildren(): INode[]
	getAllChildren(): INode[]
}

export interface INodeItem {
	getEges(): IEdge[]
}

export interface IEdgeItem {
	getSource(): IItem
	getTarget(): IItem
	getPoints(): IControlPoint[]
}
