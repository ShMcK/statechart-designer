import { message } from 'antd'
import * as React from 'react'

message.config({
	top: 50,
	getContainer: () => document.getElementById('page') || document.body,
})

class Page extends React.Component {
	render() {
		return <div id="page" />
	}
}

export default Page
