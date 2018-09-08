import { IZoom } from '@antv/g6'
import * as React from 'react'

interface IState {
	zoom: number
	maxZoom: number
	minZoom: number
}

interface IProps {
	getFlow(): any
	children(params: IState): any
}

export default class Zoom extends React.Component<IProps, IState> {
	state = {
		zoom: 1,
		maxZoom: 2,
		minZoom: 0.5,
	}
	flow: any
	afterZoom: any
	componentDidMount() {
		// TODO: cleanup flow hack
		this.afterZoom = setTimeout(() => {
			this.flow = this.props.getFlow()
			this.flow.on('afterzoom', (ev: IZoom) => {
				this.changeZoom(ev.updateMatrix[0])
			})
		}, 300)
	}
	componentWillUnmount() {
		clearTimeout(this.afterZoom)
	}
	changeZoom = (zoom: number) => {
		this.flow.zoom(zoom)
		this.setState({ zoom })
	}
	render() {
		const output = {
			...this.state,
			changeZoom: this.changeZoom,
		}
		return this.props.children(output)
	}
}
