import { exportToXState } from './export'

describe('export xstate', () => {
	it('should export 1 node', () => {
		const data = {
			nodes: [
				{
					shape: 'state',
					type: 'node',
					id: '27bd6ab5',
					index: 0,
					label: 'First',
				},
			],
		}

		const result = exportToXState(data)

		const expected = {
			key: 'First',
			inital: 'First',
			states: {
				First: {},
			},
		}
		expect(result).toBe(expected)
	})

	it('should export 2 nodes with 1 edge', () => {
		const data = {
			nodes: [
				{
					shape: 'state',
					type: 'node',
					id: '27bd6ab5',
					index: 0,
					label: 'First',
				},
				{
					shape: 'state',
					type: 'node',
					id: '132835b3',
					index: 1,
					label: 'Second',
				},
			],
			edges: [
				{
					source: '27bd6ab5',
					target: '132835b3',
					id: '8d63de4f',
					index: 2,
					label: 'FirstToSecond',
				},
			],
		}

		const result = exportToXState(data)

		const expected = {
			key: 'First',
			inital: 'First',
			states: {
				First: {
					on: {
						FirstToSecond: 'Second',
					},
				},
				Second: {},
			},
		}
		expect(result).toBe(expected)
	})

	it('should export 2 nodes with 2 edges', () => {
		const data = {
			nodes: [
				{
					shape: 'state',
					type: 'node',
					id: '27bd6ab5',
					index: 0,
					label: 'First',
				},
				{
					shape: 'state',
					type: 'node',
					id: '132835b3',
					index: 3,
					label: 'Second',
				},
			],
			edges: [
				{
					source: '27bd6ab5',
					target: '132835b3',
					id: '8d63de4f',
					index: 1,
					label: 'FirstToSecond',
				},
				{
					source: '132835b3',
					target: '27bd6ab5',
					id: '2a553b4c',
					index: 2,
					label: 'SecondToFirst',
				},
			],
		}

		const result = exportToXState(data)

		const expected = {
			key: 'First',
			inital: 'First',
			states: {
				First: {
					on: {
						FirstToSecond: 'Second',
					},
				},
				Second: {
					on: {
						SecondToFirst: 'First',
					},
				},
			},
		}
		expect(result).toBe(expected)
	})
})
