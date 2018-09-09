import { Checkbox, Form } from 'antd'
import * as React from 'react'

interface IProps {
	toggleGrid(toggle: any): void
}

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 12 },
}

export default class DetailsCanvas extends React.Component<IProps> {
	render() {
		return (
			<Form.Item label="Grid" {...formItemLayout}>
				<Checkbox onChange={this.props.toggleGrid} />
			</Form.Item>
		)
	}
}
