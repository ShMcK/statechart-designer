import * as React from 'react'

import './contextMenu.css'

class ContextMenu extends React.Component {
	render() {
		return (
			<div id="contextmenu">
				<div data-status="node-selected" className="menu">
					<div data-command="copy" className="command">
						<span>copy</span>
					</div>
					<div data-command="delete" className="command">
						<span>delete</span>
					</div>
				</div>
				<div data-status="edge-selected" className="menu">
					<div data-command="delete" className="command">
						<span>delete</span>
					</div>
				</div>
				<div data-status="group-selected" className="menu">
					<div data-command="copy" className="command">
						<span>copy</span>
					</div>
					<div data-command="delete" className="command">
						<span>delete</span>
					</div>
					<div data-command="unGroup" className="command">
						<span>ungroup</span>
					</div>
				</div>
				<div data-status="canvas-selected" className="menu">
					<div data-command="undo" className="command">
						<span>undo</span>
					</div>
					<div data-command="redo" className="command">
						<span>redo</span>
					</div>
					<div data-command="pasteHere" className="command">
						<span>paste here</span>
					</div>
				</div>
				<div data-status="multi-selected" className="menu">
					<div data-command="copy" className="command">
						<span>copy</span>
					</div>
					<div data-command="paste" className="command">
						<span>paste</span>
					</div>
					<div data-command="addGroup" className="command">
						<span>group</span>
					</div>
					<div data-command="delete" className="command">
						<span>delete</span>
					</div>
				</div>
			</div>
		)
	}
}
export default ContextMenu
