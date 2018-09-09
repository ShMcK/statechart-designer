import { Form, Input } from 'antd'
import { Title } from 'components/Panel'
import * as React from 'react'

const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 14 },
}

interface IProps {
	model: any
	onChange(e: object): void
	updateGraph(key: string, value: any): void
}

export default class TransitionDetails extends React.Component<IProps> {
	onChange = (key: string, value: any) => {
		const change = {
			tempModel: {
				...this.props.model,
				[key]: value,
			},
		}
		this.props.onChange(change)
		this.props.updateGraph(key, value)
	}
	onBlur = () => {
		this.props.onChange({ tempModel: null })
	}
	fromLabel() {
		return {
			event: 'EVENT',
			guard: 'guard',
		}
	}
	render() {
		return (
			<React.Fragment>
				<Title>Transition</Title>
				<div className="block-container">
					<Form.Item label="Id" {...formItemLayout}>
						<Input
							size="small"
							className="input name-input"
							value={this.props.model.id}
							disabled={true}
						/>
					</Form.Item>
					<Form.Item label="Event" {...formItemLayout}>
						<Input
							size="small"
							className="input name-input"
							value={this.props.model.label}
							onChange={(e) => this.onChange('label', e.target.value)}
							onBlur={(e) => this.onBlur()}
						/>
					</Form.Item>
					{/* <Form.Item label='Guard'>
					<Input
						size="small"
						className="input name-input"
						value={this.props.model.guard}
						onChange={(e) => this.onChange('guard', e.target.value)}
						onBlur={(e) => this.onBlur('guard', e.target.value)}
					/>
				</Form.Item> */}
				</div>
			</React.Fragment>
		)
	}
}
