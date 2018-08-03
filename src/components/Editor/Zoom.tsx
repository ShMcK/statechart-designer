import * as React from 'react'

interface IState {
	zoom: number
	maxZoom: number
	minZoom: number
}

interface IProps {
	changeZoom(zoom: number): void
	children(params: IState): any
}

export default class Zoom extends React.Component<IProps, IState> {
	state = {
		zoom: 1,
		maxZoom: 2,
		minZoom: 0.5,
	}
	changeZoom = (zoom: number) => {
		this.setState({ zoom })
		this.props.changeZoom(zoom)
	}
	render() {
		const output = {
			...this.state,
			changeZoom: this.changeZoom,
		}
		return this.props.children(output)
	}
}
