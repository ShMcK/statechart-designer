import { Input } from 'antd'
import * as React from 'react'

interface IProps {
	model: any
	onChange(e: object): void
	updateGraph(key: string, value: any): void
}

export default class TransitionDetails extends React.Component<IProps> {
	onChange = (e) => {
		const change = {
			tempModel: {
				label: e.target.value,
			},
		}
		this.props.onChange(change)
	}
	onBlur = (e) => {
		const value = e.target.value
		this.props.updateGraph('label', value)
		this.props.onChange({ tempModel: null })
	}
	render() {
		return (
			<div className="p">
				Event:
				<Input
					size="small"
					className="input name-input"
					value={this.props.model.label}
					onChange={this.onChange}
					onBlur={this.onBlur}
				/>
			</div>
		)
	}
}
