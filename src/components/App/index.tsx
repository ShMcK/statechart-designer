import * as React from 'react'

import Editor from '../Editor'
import StateNavigator from '../StateNavigator'
import Layout from './Layout'

interface IState {
	mode: string
}

export default class App extends React.Component<{}, IState> {
	state = {
		mode: 'play',
	}
	onSelectMode = (mode: string) => {
		this.setState({ mode })
	}
	get view() {
		switch (this.state.mode) {
			case 'editor':
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
