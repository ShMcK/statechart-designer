import * as React from 'react'

import MiniMap from './MiniMap'
import Zoom from './Zoom'

interface IProps {
	flow: any
}

export default class PageNavigator extends React.Component<IProps> {
	render() {
		return (
			<Zoom getFlow={() => this.props.flow}>
				{({ zoom, minZoom, maxZoom, changeZoom }: any) => (
					<MiniMap
						zoom={zoom}
						minZoom={minZoom}
						maxZoom={maxZoom}
						changeZoom={changeZoom}
					/>
				)}
			</Zoom>
		)
	}
}
