import { IData } from '../../../../typings/g6-editor/data' // IGroup
import { StateNodeConfig } from '../../../../typings/xstate/index'

export default (xstate: StateNodeConfig): IData => {
	return {
		nodes: [],
	}
}
