import { Checkbox, Input } from 'antd'
import * as React from 'react'

interface IProps {
	model: { label: string; initial: boolean; parallel: boolean } | null
	onChange(change: object): void
	updateGraph(key: string, value: any): void
}

export default class StateDetails extends React.Component<IProps> {
	onChange = (key, value) => {
		const change = {
			tempModel: {
				...this.props.model,
				[key]: value,
			},
		}
		this.props.onChange(change)
	}
	onBlur = (key, value) => {
		this.props.updateGraph(key, value)
		this.props.onChange({ tempModel: null })
	}
	render() {
		return (
			<React.Fragment>
				<div className="p">
					Label：
					<Input
						size="small"
						className="input name-input"
						value={this.props.model.label}
						onChange={(e) => this.onChange('label', e.target.value)}
						onBlur={(e) => this.onBlur('label', e.target.value)}
					/>
				</div>
				<div className="p">
					<Checkbox
						checked={this.props.model.initial}
						onChange={(e) =>
							this.onChange('initial', !this.props.model.initial)
						}>
						Initial
					</Checkbox>
				</div>
				<div className="p">
					<Checkbox
						checked={this.props.model.parallel}
						onChange={(e) =>
							this.onChange('parallel', !this.props.model.parallel)
						}>
						Parallel
					</Checkbox>
				</div>
			</React.Fragment>
		)
	}
}
