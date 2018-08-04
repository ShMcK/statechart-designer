import {
	INode,
	IEdge,
	IGraphType,
	IControlPoint,
	IData,
	IEvent,
	IEventType,
	IModel,
} from './data'

declare module '@antv/g6' {
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
