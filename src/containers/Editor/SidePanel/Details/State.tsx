import { Checkbox, Form, Input } from 'antd'
import { Title } from 'components/Panel'
import * as React from 'react'
import ActionList from './ActionList'

const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 14 },
}

interface IProps {
	model: any
	onChange(change: object): void
	updateGraph(key: string, value: any): void
}

export default class StateDetails extends React.Component<IProps> {
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
	render() {
		return (
			<React.Fragment>
				<Title>State</Title>
				<div className="block-container">
					<Form.Item label="Id" {...formItemLayout}>
						<Input
							size="small"
							className="input name-input"
							value={this.props.model.id}
							disabled={true}
						/>
					</Form.Item>
					<Form.Item label="Label" {...formItemLayout}>
						<Input
							size="small"
							className="input name-input"
							value={this.props.model.label}
							onChange={(e) => this.onChange('label', e.target.value)}
							onBlur={(e) => this.onBlur()}
						/>
					</Form.Item>
					<Form.Item label="Initial" {...formItemLayout}>
						<Checkbox
							style={{ marginLeft: 18 }}
							checked={this.props.model.initial}
							onChange={(e) => {
								this.onChange('initial', !this.props.model.initial)
							}}
						/>
					</Form.Item>
				</div>
				<Title>Actions</Title>
				<div className="block-container">
					<Form.Item label="Entry" {...formItemLayout} required={false}>
						<ActionList
							style={{ marginLeft: 18 }}
							value={this.props.model.onEntry || []}
							onChange={(values) => this.onChange('onEntry', values)}
						/>
					</Form.Item>
					<Form.Item label="Exit" {...formItemLayout}>
						<ActionList
							style={{ marginLeft: 18 }}
							value={this.props.model.onExit || []}
							onChange={(values) => this.onChange('onEntry', values)}
						/>
					</Form.Item>
				</div>
			</React.Fragment>
		)
	}
}
