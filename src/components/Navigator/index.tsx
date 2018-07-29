import { Dropdown, Icon, Menu, Slider } from 'antd'
import * as React from 'react'

import './navigator.css'

interface IProps {
	zoom: number
	maxZoom: number
	minZoom: number
	changeZoom(zoom: number): void
}

class Navigator extends React.Component<IProps> {
	sliderTipFormatter = (num) => {
		const { minZoom, maxZoom } = this.props
		const zoom = Math.ceil(num * (maxZoom - minZoom) + minZoom * 100)
		return zoom + '%'
	}
	sliderChange = (num) => {
		const { minZoom, maxZoom, changeZoom } = this.props
		changeZoom((num / 100) * (maxZoom - minZoom) + minZoom)
	}
	dropdownChange = (ev) => {
		const item = ev.item
		const zoom = item.props.zoom
		const { changeZoom } = this.props
		changeZoom(Number(zoom))
	}
	render() {
		const { zoom, minZoom, maxZoom } = this.props
		const menu = (
			<Menu onClick={this.dropdownChange}>
				<Menu.Item zoom="0.5">50%</Menu.Item>
				<Menu.Item zoom="1">100%</Menu.Item>
				<Menu.Item zoom="1.5">150%</Menu.Item>
				<Menu.Item zoom="2">200%</Menu.Item>
			</Menu>
		)
		return (
			<div id="navigator">
				<div className="pannel-title">Navigator</div>
				<div id="minimap" />
				<div id="zoom-slider">
					<Slider
						value={((zoom - minZoom) / (maxZoom - minZoom)) * 100}
						className="slider"
						tipFormatter={this.sliderTipFormatter}
						onChange={this.sliderChange}
					/>
					<Dropdown overlay={menu}>
						<a className="zoom-dropdown-btn" href="#">
							{Math.ceil(zoom * 100)} %<Icon type="down" />
						</a>
					</Dropdown>
				</div>
			</div>
		)
	}
}

export default Navigator
