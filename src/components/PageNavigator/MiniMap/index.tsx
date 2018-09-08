import { Dropdown, Icon, Menu, Slider } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

import { Title } from 'components/Panel'

const Container = styled.div`
	width: 225px;
	height: 176px;
`

const ZoomSlider = styled(Slider)`
	margin: 7px 10px 10px;
	float: left;
	width: 120px;
`

const MiniMap = styled.div`
	width: 100%;
	height: 120px;
`

const ZoomDropdownButton = styled.a`
	color: rgba(0, 0, 0, 0.45);
	margin-left: 4px;
	line-height: 24px;
	font-weight: 100;
	text-decoration: none;
`

interface IProps {
	zoom: number
	maxZoom: number
	minZoom: number
	changeZoom(zoom: number): void
}

class Navigator extends React.Component<IProps> {
	sliderTipFormatter = (num: number) => {
		const { minZoom, maxZoom } = this.props
		const zoom = Math.ceil(num * (maxZoom - minZoom) + minZoom * 100)
		return zoom + '%'
	}
	sliderChange = (num: number) => {
		const { minZoom, maxZoom, changeZoom } = this.props
		changeZoom((num / 100) * (maxZoom - minZoom) + minZoom)
	}
	dropdownChange = (ev: any) => {
		const item = ev.item
		const zoom = item.props.zoom
		const { changeZoom } = this.props
		changeZoom(Number(zoom))
	}
	get menu() {
		return (
			<Menu onClick={this.dropdownChange}>
				<Menu.Item zoom="0.5">50%</Menu.Item>
				<Menu.Item zoom="1">100%</Menu.Item>
				<Menu.Item zoom="1.5">150%</Menu.Item>
				<Menu.Item zoom="2">200%</Menu.Item>
			</Menu>
		)
	}
	render() {
		const { zoom, minZoom, maxZoom } = this.props
		return (
			<Container>
				<Title>Navigator</Title>
				<MiniMap id="minimap" />
				<div>
					<ZoomSlider
						value={((zoom - minZoom) / (maxZoom - minZoom)) * 100}
						tipFormatter={this.sliderTipFormatter}
						onChange={this.sliderChange}
					/>
					<Dropdown overlay={this.menu}>
						<ZoomDropdownButton href="#">
							{Math.ceil(zoom * 100)} %<Icon type="down" />
						</ZoomDropdownButton>
					</Dropdown>
				</div>
			</Container>
		)
	}
}

export default Navigator
