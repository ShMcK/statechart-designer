import { Alert } from 'antd'
import * as React from 'react'

interface IProps {
	children: string | null
}

const styles = {
	page: {
		padding: '1em',
	},
	text: {
		color: 'white',
	},
}

export default class ErrorPage extends React.Component<IProps> {
	render() {
		if (!this.props.children) {
			return null
		}
		return (
			<div style={styles.page}>
				<Alert message="Error" description={this.props.children} type="error" />
			</div>
		)
	}
}
