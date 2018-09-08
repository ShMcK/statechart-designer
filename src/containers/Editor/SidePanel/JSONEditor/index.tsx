import { IGraph } from '@antv/g6'
import { Button } from 'antd'
import * as React from 'react'

import ErrorPage from 'components/ErrorPage'
import { notifyCanvas } from 'services/notify'
import styled from 'styled-components'
import { exportToXState } from 'utils/export'
import { load } from 'utils/storage'

const Container = styled.div`
	position: relative;
	padding: 5px;
	background: #565758;
	margin-top: -15px;
	color: white;
	height: 100%;
	overflow: scroll;
`

const Copy = styled.div`
	position: absolute;
	top: 8px;
	right: 12px;
	transition: all 0.2s ease-in-out;
	:hover {
		transform: scale(1.1);
	}
`

interface IProps {
	flow: IGraph
}

export default class JSONEditor extends React.Component<IProps> {
	state = {
		error: null,
		xstate: {},
	}
	componentDidMount() {
		this.loadXState()
		this.props.flow.on('afterchange', this.loadXState)
	}
	loadXState = async () => {
		try {
			const data = await load()
			const xstate = exportToXState(data)
			this.setState({ error: null, xstate })
		} catch (error) {
			this.setState({ error: error.message, xstate: {} })
		}
	}
	copyToClipboard = () => {
		let navigator: any
		navigator = window.navigator
		navigator.clipboard.writeText(JSON.stringify(this.state.xstate, null, 2))
		notifyCanvas.info('Copied to clipboard')
	}
	render() {
		if (this.state.error) {
			return <ErrorPage>{this.state.error}</ErrorPage>
		}
		return (
			<Container style={{ minHeight: window.innerHeight - 76 }}>
				<Copy>
					<Button
						onClick={this.copyToClipboard}
						{...{ icon: 'copy', ghost: true, size: 'small' }}
					/>
				</Copy>
				<code>
					<pre id="json">{JSON.stringify(this.state.xstate, null, 2)}</pre>
				</code>
			</Container>
		)
	}
}
