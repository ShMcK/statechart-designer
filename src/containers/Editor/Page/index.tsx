import * as React from 'react'
import styled from 'styled-components'

const PageEditor = styled.div`
	margin-right: 225px;
`

class Page extends React.Component {
	render() {
		return <PageEditor id="page" />
	}
}

export default Page
