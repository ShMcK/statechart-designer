import * as React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: 0;
	z-index: 10000;
	cursor: not-allowed;
`

const PageEditor = styled.div`
	position: relative;
	margin-right: 225px;
`

class Page extends React.Component {
	render() {
		return (
			<PageEditor id="page">
				<Overlay />
			</PageEditor>
		)
	}
}

export default Page
