import { Avatar, Badge, Layout } from 'antd'
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
					<Badge dot={true} title="Alpha">
						<Avatar
							shape="square"
							size={32}
							style={{ background: 'rgba(255,255,255,.2)' }}>
							SCD
						</Avatar>
					</Badge>

					{/* <div style={styles.logo} /> */}
					{/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<Menu.Item key="1">
							<Icon type="user" />
							<span>nav 1</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="video-camera" />
							<span>nav 2</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="upload" />
							<span>nav 3</span>
						</Menu.Item>
					</Menu> */}
				</Sider>
				<Layout>
					<Content style={styles.content}>{this.props.children || ''}</Content>
				</Layout>
			</Layout>
		)
	}
}
