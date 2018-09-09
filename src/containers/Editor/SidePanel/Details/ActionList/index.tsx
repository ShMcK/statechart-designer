import { Button, Icon, Input } from 'antd'
import * as React from 'react'

interface IItem {
	id: number
	value: string | null
}

interface IProps {
	style: object
	value: string[]
	onChange(values: string[]): void
}

interface IState {
	items: IItem[]
}

export default class ActionList extends React.Component<IProps, IState> {
	state = {
		items: this.props.value.map((str, index) => ({
			id: index,
			value: str,
		})),
	}
	onChange(items: IItem[]) {
		const values = items.reduce((all: string[], next: IItem) => {
			if (next.value) {
				return [...all, next.value]
			}
			return all
		}, [])
		this.props.onChange(values)
	}
	add = () => {
		const maxId = Math.max(0, ...this.state.items.map((item) => item.id)) + 1
		const items = [...this.state.items, { id: maxId, value: null }]
		this.setState({ items })
		this.onChange(items)
	}
	remove = (id: number) => {
		const items = this.state.items.filter((item) => item.id !== id)
		this.setState({ items })
		this.onChange(items)
	}
	render() {
		const { items } = this.state
		return (
			<div style={{ marginLeft: 20 }}>
				{items.map((item, index) => (
					<div key={item.id}>
						<Input placeholder="action name" style={{ width: '90%' }} />
						{items.length > 1 && (
							<Icon
								style={{ width: '10px' }}
								type="minus-circle-o"
								onClick={() => this.remove(item.id)}
							/>
						)}
					</div>
				))}

				<div>
					<Button
						type="dashed"
						size="small"
						style={{ width: '40%' }}
						onClick={this.add}>
						<Icon type="plus" />
					</Button>
				</div>
			</div>
		)
	}
}
