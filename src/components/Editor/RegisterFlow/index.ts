import G6Editor, { IFlow } from '@antv/g6-editor'

import registerFlowGroup from './FlowGroup'
import registerModelCard from './ModelCard'
import registerPanelItems from './PanelItems'

export default () => {
	const Flow: IFlow = G6Editor.Flow
	registerModelCard(Flow)
	registerPanelItems(Flow)
	registerFlowGroup(Flow)
}
