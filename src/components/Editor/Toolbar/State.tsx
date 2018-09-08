import { IAnchor } from '@antv/g6'
import { IFlow } from '@antv/g6-editor'

const anchor: IAnchor[] = [
	[0, 0, { type: 'input' }],
	[0, 0, { type: 'output' }],
	[0.5, 0, { type: 'input' }],
	[0.5, 0, { type: 'output' }],
	[1, 0, { type: 'input' }],
	[1, 0, { type: 'output' }],
	[0, 1, { type: 'input' }],
	[0, 1, { type: 'output' }],
	[0.5, 1, { type: 'input' }],
	[0.5, 1, { type: 'output' }],
	[1, 1, { type: 'input' }],
	[1, 1, { type: 'output' }],
	[1, 0.5, { type: 'input' }],
	[1, 0.5, { type: 'output' }],
	[0, 0.5, { type: 'input' }],
	[0, 0.5, { type: 'output' }],
]

export default (Flow: IFlow) => {
	Flow.registerNode('state', { label: 'State', anchor }, 'model-card')
}
