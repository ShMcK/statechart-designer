import { IFlow } from '@antv/g6-editor'
import anchor from './anchor'

export default (Flow: IFlow) => {
	Flow.registerNode('state', { label: 'State', anchor }, 'model-card')
}
