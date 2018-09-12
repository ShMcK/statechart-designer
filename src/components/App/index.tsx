import { Icon, notification } from 'antd'
import * as React from 'react'

import Editor from 'containers/Editor'
import StateNavigator from 'containers/StateNavigator'
import Layout from './Layout'

interface IState {
	mode: string
}

export default class App extends React.Component<{}, IState> {
	state = {
		mode: 'edit',
	}
	async componentDidMount() {
		const informedAlpha = await window.localStorage.getItem('tellYaBoutDaBugs')
		if (!informedAlpha) {
			this.bugNotify()
			window.localStorage.setItem('tellYaBoutDaBugs', 'DoneToldja')
		}
	}
	bugNotify() {
		setTimeout(
			() =>
				notification.info({
					icon: <Icon type="heart" />,
					message: 'Forgive me',
					description: 'I have bugs. Still working things out.',
				}),
			3000,
		)
	}
	onSelectMode = (mode: string) => {
		this.setState({ mode })
	}
	get view() {
		switch (this.state.mode) {
			case 'edit':
				return <Editor />
			case 'play':
				return <StateNavigator />
			default:
				return null
		}
	}
	render() {
		return (
			<Layout mode={this.state.mode} onSelectMode={this.onSelectMode}>
				{this.view}
			</Layout>
		)
	}
}
