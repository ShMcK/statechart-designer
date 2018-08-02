import G6Editor from '@antv/g6-editor'

import registerFlowGroup from './FlowGroup'
import registerModelCard from './ModelCard'
import registerPanelItems from './PanelItems'

const Flow = G6Editor.Flow

export default () => {
	registerModelCard(Flow)
	registerPanelItems(Flow)
	registerFlowGroup(Flow)
}
