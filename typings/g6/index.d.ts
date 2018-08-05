declare module '@antv/g6' {
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

	export type ILabel = string & IBoxLabel

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
		label: ILabel
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
		label: ILabel
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
		label?: ILabel
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

	type IGraphLayout = (
		nodes: INode[],
		edges: IEdge[],
	) => void | {
		execute(): void
	}

	type IFitView =
		| 'tl'
		| 'lc'
		| 'bl'
		| 'cc'
		| 'tc'
		| 'rc'
		| 'br'
		| 'bc'
		| 'autoZoom'

	function zoom(scale: number): void
	function zoom(graphPoint: IControlPoint, scale: number): void

	interface IGraph {
		save(): void
		read(data: IData): void
		on(eventType: IEventType, onEvent: (ev: IEvent) => void): void
		find(id: string): INode | undefined
		add(type: IGraphType, model: IModel)
		remove(item: IModel)
		update(item: string | IModel, model: IModel)
		node(mapper: object)
		edge(mapper: object)
		group(mapper: object)
		getDomPoint(graphPoint: IControlPoint): IControlPoint
		getPoint(domPoint: IControlPoint): IControlPoint
		focusPoint(graphPoint: IControlPoint): IControlPoint
		focus(item: string | IModel)
		zoom
		translate(number, number: void)
		changeSize(width: number, height: number)
		setFitView(fitView: IFitView): void
		getZoom(): number
		getWidth(): number
		getHeight(): number
		getItems(): IModel[]
		getNodes(): INode[]
		getEdges(): IEdge[]
		getGroups(): IGroup[]
		getGuides(): IGuide[]
	}

	interface IGraphConfig {
		container: Element | string
		width: number
		height: number
		fitView: IFitView
		fitViewPadding: number | number[]
		animate: boolean
		minZoom: number
		maxZoom: number
		mode: string
		plugins: Array
		layout:
			| {
					auto: boolean
					processer: IGraphLayout
			  }
			| IGraphLayout
	}
	export default class G6 {
		Graph(graphConfig: IGraphConfig): IGraph
	}
}
