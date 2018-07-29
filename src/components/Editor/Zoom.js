import * as React from 'react'

export default class Zoom extends React.Component {
	state = {
		zoom: 1,
		maxZoom: 2,
		minZoom: 0.5,
	}
	render() {
		return this.props.children(this.state)
	}
}
