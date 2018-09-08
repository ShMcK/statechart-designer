import { IGraph } from '@antv/g6'
import { IEditor } from '@antv/g6-editor'
import * as React from 'react'

import PageNavigator from '../../PageNavigator'
import StateNav from './StateNav'

const styles = {
	sidePanel: {
		height: '100vh',
		width: '225px',
		position: 'absolute' as 'absolute',
		right: 0,
		zIndex: 2,
		background: '#f7f9fb',
		borderLeft: '1px solid #e6e9ed',
	},
	innerSidePanel: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column' as 'column',
		justifyContent: 'space-between',
	},
}

interface IProps {
	editor: IEditor
	flow: IGraph
	model: any
	onChange(change: any): void
}

export default class SidePanel extends React.Component<IProps> {
	toggleGrid = (ev: any) => {
		if (ev.target.checked) {
			this.props.flow.showGrid()
		} else {
			this.props.flow.hideGrid()
		}
	}
	updateGraph = (key: string, value: any) => {
		this.props.editor.executeCommand(() => {
			const selectedItems = this.props.flow.getSelected()
			selectedItems.forEach((item: any) => {
				const updateModel = {}
				updateModel[key] = value
				this.props.flow.update(item, updateModel)
			})
		})
	}
	render() {
		return (
			<div style={styles.sidePanel}>
				<div style={styles.innerSidePanel}>
					<StateNav flow={this.props.flow} />
					<div style={{ alignSelf: 'flex-end' }}>
						<PageNavigator flow={this.props.flow} />
					</div>
				</div>
			</div>
		)
	}
}
