import * as React from 'react'
import './toolbar.css'

class Toolbar extends React.Component {
	state = {
		initial: true,
	}
	componentDidMount() {
		this.showHighlight()
	}
	showHighlight = () => {
		this.setState({ initial: true })
		setTimeout(() => this.setState({ initial: false }), 3000)
	}
	render() {
		return (
			<div id="toolbar">
				<span id="itempannel">
					{/* <ul>
						{this.props.items.map((item: any) => (
							<li
								onMouseOver={this.showHighlight}
								key="state"
								className={`getItem ${
									this.state.initial ? 'initial-highlight' : ''
								}`}
								data-shape="state"
								data-type="node"
								data-size="170*34">
								<span className="pannel-type-icon" />
								{item.label}
							</li>
						))}
					</ul> */}
				</span>

				<span>
					<span className="separator" />
					<link
						rel="stylesheet"
						type="text/css"
						href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css"
					/>
					<i
						data-command="undo"
						className="command iconfont icon-undo"
						title="undo"
					/>
					<i
						data-command="redo"
						className="command iconfont icon-redo"
						title="redo"
					/>
					<span className="separator" />
					<i
						data-command="copy"
						className="command iconfont icon-copy-o"
						title="copy"
					/>
					<i
						data-command="paste"
						className="command iconfont icon-paster-o"
						title="paste"
					/>
					<i
						data-command="delete"
						className="command iconfont icon-delete-o"
						title="delete"
					/>
					<span className="separator" />
					<i
						data-command="zoomIn"
						className="command iconfont icon-zoom-in-o"
						title="zoom in"
					/>
					<i
						data-command="zoomOut"
						className="command iconfont icon-zoom-out-o"
						title="zoom out"
					/>
					<i
						data-command="autoZoom"
						className="command iconfont icon-fit"
						title="auto zoom"
					/>
					<i
						data-command="resetZoom"
						className="command iconfont icon-actual-size-o"
						title="reset zoom"
					/>
					<span className="separator" />
					<i
						data-command="toBack"
						className="command iconfont icon-to-back"
						title="to back"
					/>
					<i
						data-command="toFront"
						className="command iconfont icon-to-front"
						title="to front"
					/>
					<span className="separator" />
					<i
						data-command="multiSelect"
						className="command iconfont icon-select"
						title="multi select"
					/>
					<i
						data-command="addGroup"
						className="command iconfont icon-group"
						title="group"
					/>
					<i
						data-command="unGroup"
						className="command iconfont icon-ungroup"
						title="ungroup"
					/>
					<span className="separator" />
				</span>
			</div>
		)
	}
}

export default Toolbar
