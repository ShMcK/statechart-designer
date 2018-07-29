import React from 'react'
import { Checkbox } from 'antd'

export default class DetailsCanvas extends React.Component {
	render() {
		return <Checkbox onChange={this.props.toggleGrid}>Grid</Checkbox>
	}
}
