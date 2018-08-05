import { IData } from '@antv/g6' // IGroup
import { StateNodeConfig } from 'typings/xstate'

export default (xstate: StateNodeConfig): IData => {
	return {
		nodes: [],
	}
}
