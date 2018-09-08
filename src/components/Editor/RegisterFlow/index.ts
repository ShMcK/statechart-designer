import G6Editor, { IFlow } from '@antv/g6-editor'

import registerFlowGroup from './FlowGroup'
import registerModelCard from './ModelCard'

export default () => {
	const Flow: IFlow = G6Editor.Flow
	registerModelCard(Flow)
	registerFlowGroup(Flow)
}
