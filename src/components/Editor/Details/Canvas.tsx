import { Checkbox } from 'antd'
import * as React from 'react'

interface IProps {
	toggleGrid(toggle: any): void
}

export default class DetailsCanvas extends React.Component<IProps> {
	render() {
		return <Checkbox onChange={this.props.toggleGrid}>Grid</Checkbox>
	}
}
