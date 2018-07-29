import React from 'react'
import { Input } from 'antd'

export default class TransitionDetails extends React.Component {
	onChange = (change) => {
		this.props.onChange(change)
	}
	onBlur = (key, value) => {
		this.props.updateGraph(key, value)
		this.props.onChange({ inputingLabel: null })
	}
	render() {
		return (
			<div className="p">
				Event:
				<Input
					size="small"
					className="input name-input"
					value={this.props.label}
					onChange={(e) => this.onChange({ inputingLabel: e.target.value })}
					onBlur={(e) => this.onBlur('label', e.target.value)}
				/>
			</div>
		)
	}
}
