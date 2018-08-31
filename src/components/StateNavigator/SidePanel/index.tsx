import * as React from 'react'

import Navigator from '../Navigator'
import StateNav from './StateNav'
import Zoom from './Zoom'

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
}

interface IProps {
	editor: any
	flow: any
	model: any
	onChange(change: any): void
}

export default class SidePanel extends React.Component<IProps> {
	stateNavigator: any = React.createRef()
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
	onTabChange = (activeKey: string) => {
		if (activeKey !== '1') {
			this.props.flow.clearSelected()
		}
		this.props.onChange({ pageDisabled: false })
	}
	render() {
		return (
			<div style={styles.sidePanel}>
				<StateNav getFlow={() => this.props.flow} />
				<div style={{ alignSelf: 'flex-end' }}>
					<Zoom getFlow={() => this.props.flow}>
						{({ zoom, minZoom, maxZoom, changeZoom }: any) => (
							<Navigator
								zoom={zoom}
								minZoom={minZoom}
								maxZoom={maxZoom}
								changeZoom={changeZoom}
							/>
						)}
					</Zoom>
				</div>
			</div>
		)
	}
}
