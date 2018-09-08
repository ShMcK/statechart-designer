import { IGraph } from '@antv/g6'
import { IEditor } from '@antv/g6-editor'
import * as React from 'react'
import styled from 'styled-components'

import PageNavigator from 'components/PageNavigator'
import StateNav from '../StateNav'

const SidePanelContainer = styled.div`
	height: 100vh;
	width: 225px;
	position: absolute;
	right: 0;
	z-index: 2;
	background: #f7f9fb;
	border-left: 1px solid #e6e9ed;
`

const SidePanelInner = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

interface IProps {
	editor: IEditor
	flow: IGraph
	model: any
	onChange(change: any): void
}

export default class SidePanel extends React.Component<IProps> {
	render() {
		return (
			<SidePanelContainer>
				<SidePanelInner>
					{this.props.flow && <StateNav flow={this.props.flow} />}
					<div style={{ alignSelf: 'flex-end' }}>
						<PageNavigator flow={this.props.flow} />
					</div>
				</SidePanelInner>
			</SidePanelContainer>
		)
	}
}
