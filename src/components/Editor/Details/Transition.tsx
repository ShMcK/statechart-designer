// import { Input } from 'antd'
import * as React from 'react'

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
	}
	// onBlur = (key: string, value: any) => {
	// 	let label = this.props.model.event || ''
	// 	if (this.props.model.guard) {
	// 		label = `${label} [${this.props.model.guard}]`
	// 	}

	// 	this.props.updateGraph('label', label)
	// 	this.props.onChange({ tempModel: null })
	// }
	fromLabel() {
		return {
			event: 'EVENT',
			guard: 'guard',
		}
	}
	render() {
		return (
			<React.Fragment>
				{/* <div className="p">
					Event:
					<Input
						size="small"
						className="input name-input"
						value={this.props.model.event}
						onChange={(e) => this.onChange('event', e.target.value)}
						onBlur={(e) => this.onBlur('event', e.target.value)}
					/>
				</div>
				<div className="p">
					Guard:
					<Input
						size="small"
						className="input name-input"
						value={this.props.model.guard}
						onChange={(e) => this.onChange('guard', e.target.value)}
						onBlur={(e) => this.onBlur('guard', e.target.value)}
					/>
				</div> */}
			</React.Fragment>
		)
	}
}
