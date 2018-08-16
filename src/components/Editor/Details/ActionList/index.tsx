import { Button, Form, Icon, Input } from 'antd'
import * as React from 'react'

const FormItem = Form.Item

interface IItem {
	id: number
	value: string | null
}

interface IProps {
	label: string
	value: string[]
	onChange(values: string[]): void
}

interface IState {
	items: IItem[]
}

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
}
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 10, offset: 6 },
	},
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
			<>
				{items.map((item, index) => (
					<FormItem
						{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
						label={index === 0 ? `${this.props.label}:` : ''}
						required={false}
						key={item.id}>
						<Input
							placeholder="action name"
							style={{ width: '60%', marginRight: 8 }}
						/>
						{items.length > 1 && (
							<Icon
								className="dynamic-delete-button"
								type="minus-circle-o"
								onClick={() => this.remove(item.id)}
							/>
						)}
					</FormItem>
				))}

				<FormItem>
					<Button
						type="dashed"
						size="small"
						style={{ width: '60%' }}
						onClick={this.add}>
						<Icon type="plus" /> {this.props.label}
					</Button>
				</FormItem>
			</>
		)
	}
}
