import * as React from 'react'

interface IProps {
	children(IState): any
}

interface IState {
	zoom: number
	maxZoom: number
	minZoom: number
}

export default class Zoom extends React.Component<IProps, IState> {
	state = {
		zoom: 1,
		maxZoom: 2,
		minZoom: 0.5,
	}
	render() {
		return this.props.children(this.state)
	}
}
