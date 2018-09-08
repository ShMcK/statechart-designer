import { Checkbox, Form } from 'antd'
import * as React from 'react'

interface IProps {
	toggleGrid(toggle: any): void
}

export default class DetailsCanvas extends React.Component<IProps> {
	render() {
		return (
			<Form.Item>
				<Checkbox onChange={this.props.toggleGrid}>Grid</Checkbox>
			</Form.Item>
		)
	}
}
