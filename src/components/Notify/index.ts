import { message } from 'antd'

message.config({
	top: 50,
	getContainer: () => document.getElementById('page') || document.body,
})

export const notifyCanvas = message
