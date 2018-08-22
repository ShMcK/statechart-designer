import * as React from 'react'

interface IProps {
	disabled: boolean
}

class Page extends React.Component<IProps> {
	get overlay() {
		if (this.props.disabled) {
			return <div className="overlay" />
		}
		return null
	}
	render() {
		return <div id="page">{this.overlay}</div>
	}
}

export default Page
