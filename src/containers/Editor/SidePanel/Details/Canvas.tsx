import { Checkbox, Form } from 'antd'
import * as React from 'react'

interface IProps {
	toggleGrid(toggle: any): void
}

export default class DetailsCanvas extends React.Component<IProps> {
	render() {
		return (
			<Form.Item label="Grid">
				<Checkbox onChange={this.props.toggleGrid} />
			</Form.Item>
		)
	}
}
