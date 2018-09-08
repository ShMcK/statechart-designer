import { Alert } from 'antd'
import * as React from 'react'
import styled from 'styled-components'

interface IProps {
	children: string | null
}

const HasError = styled.div`
	padding: 1rem;
`

export default class ErrorPage extends React.Component<IProps> {
	render() {
		if (!this.props.children) {
			return null
		}
		return (
			<HasError>
				<Alert message="Error" description={this.props.children} type="error" />
			</HasError>
		)
	}
}
