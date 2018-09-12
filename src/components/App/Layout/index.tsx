import { Avatar, Badge, Icon, Layout, Menu } from 'antd'
import * as React from 'react'

const { Sider, Content } = Layout

const styles = {
	sider: {
		paddingTop: '1em',
		display: 'flex',
		justifyContent: 'center',
		height: '100vh',
	},
	version: {
		color: 'white',
		textAlign: 'center' as 'center',
		opacity: 0.4,
	},
	trigger: {
		fontSize: 18,
		lineHeight: 64,
		padding: '0 24px',
		cursor: 'pointer',
		transition: 'color .3s',
	},
	content: {
		background: '#fff',
		minHeight: 280,
	},
	logo: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '5px',
	},
}

interface IProps {
	mode: string
	onSelectMode(mode: string): void
}

interface IState {
	collapsed: boolean
}

export default class SiderDemo extends React.Component<IProps, IState> {
	state = {
		collapsed: true,
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}

	onSelect = ({ key }: { key: string }) => {
		this.props.onSelectMode(key)
	}

	render() {
		return (
			<Layout>
				<Sider
					style={styles.sider}
					trigger={null}
					collapsible={true}
					collapsed={this.state.collapsed}>
					<div style={styles.logo}>
						<Badge dot={true} title="Alpha">
							<Avatar
								shape="square"
								size={32}
								style={{ background: 'rgba(255,255,255,.2)' }}>
								SCD
							</Avatar>
						</Badge>
					</div>
					<div style={styles.version}>v0.1 alpha</div>

					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={[this.props.mode]}
						onSelect={this.onSelect}>
						<Menu.Item key="edit">
							<Icon type="edit" />
							<span>Edit</span>
						</Menu.Item>
						<Menu.Item key="play">
							<Icon type="play-circle" />
							<span>Play</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Content style={styles.content}>{this.props.children || ''}</Content>
				</Layout>
			</Layout>
		)
	}
}
