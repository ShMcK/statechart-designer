import * as React from 'react'

export default class StateModelCard extends React.Component {
	state = {
		initial: true,
	}
	highlightTimeout: any
	componentDidMount() {
		this.showHighlight()
	}
	componentWillUnmount() {
		clearTimeout(this.highlightTimeout)
	}
	highlight = () => {
		this.setState({ initial: false })
	}
	showHighlight = () => {
		this.setState({ initial: true })
		this.highlightTimeout = setTimeout(this.highlight, 3000)
	}
	render() {
		return (
			<li
				onMouseOver={this.showHighlight}
				key="state"
				className={`getItem ${this.state.initial ? 'initial-highlight' : ''}`}
				data-shape="state"
				data-type="node"
				data-size="170*34">
				<span className="pannel-type-icon" />
				State
			</li>
		)
	}
}
