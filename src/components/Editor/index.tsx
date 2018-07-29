import G6Editor from '@antv/g6-editor'
import * as React from 'react'

import './editor.css'

interface IState {
	curZoom: number
	maxZoom: number
	minZoom: number
	selectedModel: object
	tempModel: object | null
}

export default class Editor extends React.Component<{}, IState> {
	constructor(props) {
		super(props)
		this.state = {
			curZoom: 1, // 当前缩放比率
			maxZoom: 2, // 最大缩放比率s
			minZoom: 0.5, // 最小缩放比率
			tempModel: null,
			selectedModel: {}, // 当前选中项数据模型
		}
	}
	changeZoom = (zoom: number) => {
		this.page.zoom(zoom)
	}
	toggleGrid = (ev) => {
		const { page } = this
		if (ev.target.checked) {
			page.showGrid()
		} else {
			page.hideGrid()
		}
	}
	updateGraph = (key: string, value: any) => {
		const { editor } = this
		editor.executeCommand(() => {
			const { page } = this
			const selectedItems = page.getSelected()
			selectedItems.forEach((item) => {
				const updateModel = {}
				updateModel[key] = value
				page.update(item, updateModel)
			})
		})
	}
	componentDidMount() {
		// 生成 G6 Editor 编辑器
		const height = window.innerHeight - 38
		const editor = new G6Editor()
		const minimap = new G6Editor.Minimap({
			container: 'minimap',
			height: 120,
			width: 200,
		})
		const toolbar = new G6Editor.Toolbar({
			container: 'toolbar',
		})
		const contextmenu = new G6Editor.Contextmenu({
			container: 'contextmenu',
		})
		const itempannel = new G6Editor.Itempannel({
			container: 'itempannel',
		})
		const detailpannel = new G6Editor.Detailpannel({
			container: 'detailpannel',
		})
		const page = new G6Editor.Flow({
			align: {
				grid: true,
			},
			edgeResizeable: false,
			graph: {
				container: 'page',
				height,
			},
			noEndEdge: false,
		})
		page.on('afteritemselected', (ev) => {
			this.setState({
				selectedModel: ev.item.getModel(),
			})
		})
		page.on('afterzoom', (ev) => {
			this.setState({
				curZoom: ev.updateMatrix[0],
			})
		})
		editor.add(minimap)
		editor.add(toolbar)
		editor.add(contextmenu)
		editor.add(itempannel)
		editor.add(detailpannel)
		editor.add(page)
		this.page = page
		this.editor = editor
	}
}
