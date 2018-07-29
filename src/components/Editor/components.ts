import G6Editor from '@antv/g6-editor'

const initEditorComponents = (onChange) => {
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
			height: window.innerHeight - 38,
		},
		noEndEdge: false,
	})

	page.on('afteritemselected', (ev) => {
		onChange({
			selectedModel: ev.item.getModel(),
		})
	})
	page.on('afterzoom', (ev) => {
		onChange({
			curZoom: ev.updateMatrix[0],
		})
	})
	editor.add(minimap)
	editor.add(toolbar)
	editor.add(contextmenu)
	editor.add(itempannel)
	editor.add(detailpannel)
	editor.add(page)

	// 输入锚点不可以连出边
	page.on('hoveranchor:beforeaddedge', (ev) => {
		if (ev.anchor.type === 'input') {
			ev.cancel = true
		}
	})
	page.on('dragedge:beforeshowanchor', (ev) => {
		// 只允许目标锚点是输入，源锚点是输出，才能连接
		if (
			!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')
		) {
			ev.cancel = true
		}
		// 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
		if (
			ev.dragEndPointType === 'target' &&
			page.anchorHasBeenLinked(ev.target, ev.targetAnchor)
		) {
			ev.cancel = true
		}
		// 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
		if (
			ev.dragEndPointType === 'source' &&
			page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)
		) {
			ev.cancel = true
		}
	})

	return {
		page,
		editor,
	}
}

export default initEditorComponents
