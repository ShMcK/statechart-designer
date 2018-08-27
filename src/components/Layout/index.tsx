import { Avatar, Badge, Icon, Layout, Menu } from 'antd'
import * as React from 'react'

const { Sider, Content } = Layout

const styles = {
	sider: {
		paddingTop: '1em',
		display: 'flex',
		justifyContent: 'center',
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
		marginBottom: '20px',
	},
}

export default class SiderDemo extends React.Component {
	state = {
		collapsed: true,
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
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

					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<Menu.Item key="1">
							<Icon type="edit" />
							<span>Edit</span>
						</Menu.Item>
						<Menu.Item key="2">
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
