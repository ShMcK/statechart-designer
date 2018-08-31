import * as React from 'react'

import Editor from '../Editor'
import Layout from './Layout'

export default class App extends React.Component {
	render() {
		return (
			<Layout>
				<Editor />
			</Layout>
		)
	}
}
