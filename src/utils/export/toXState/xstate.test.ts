import { IData } from 'typings/g6-editor/data'
import { StateNodeConfig } from 'typings/xstate/index'
import exportToXState from './index'

describe('export xstate', () => {
	describe('initial', () => {
		it('uses the root initial state', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: 'e54f9f9b',
						index: 1,
						label: 'Second',
						initial: true,
					},
					{
						shape: 'state',
						type: 'node',
						id: '05a22f1a',
						index: 3,
						initial: false,
						label: 'First',
					},
				],
				edges: [
					{
						source: 'e54f9f9b',
						target: '05a22f1a',
						id: '36bc360f',
						index: 2,
						label: 'SecondToFirst',
					},
				],
			}

			const result = exportToXState(data)

			const expected: StateNodeConfig = {
				initial: 'Second',
				states: {
					First: {},
					Second: {
						on: {
							SecondToFirst: 'First',
						},
					},
				},
			}
			expect(result).toEqual(expected)
		})

		it('throws if there is no initial state', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: 'e54f9f9b',
						index: 1,
						label: 'Second',
						initial: false,
					},
					{
						shape: 'state',
						type: 'node',
						id: '05a22f1a',
						index: 3,
						initial: false,
						label: 'First',
					},
				],
				edges: [
					{
						source: 'e54f9f9b',
						target: '05a22f1a',
						id: '36bc360f',
						index: 2,
						label: 'SecondToFirst',
					},
				],
			}

			const shouldThrow = () => exportToXState(data)

			expect(shouldThrow).toThrow(/No initial/)
		})

		it('throws if there are competing initial states', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: 'e54f9f9b',
						index: 1,
						label: 'Second',
						initial: true,
					},
					{
						shape: 'state',
						type: 'node',
						id: '05a22f1a',
						index: 3,
						initial: true,
						label: 'First',
					},
				],
				edges: [
					{
						source: 'e54f9f9b',
						target: '05a22f1a',
						id: '36bc360f',
						index: 2,
						label: 'SecondToFirst',
					},
				],
			}

			const shouldThrow = () => exportToXState(data)

			expect(shouldThrow).toThrow(/Too many initial/)
		})
	})

	describe('traverse nodes', () => {
		it('should export 1 node', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: '27bd6ab5',
						index: 0,
						label: 'First',
						initial: true,
					},
				],
			}

			const result = exportToXState(data)

			const expected: StateNodeConfig = {
				initial: 'First',
				states: {
					First: {},
				},
			}
			expect(result).toEqual(expected)
		})

		it('should export 2 nodes with 1 edge', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: '27bd6ab5',
						index: 0,
						label: 'First',
						initial: true,
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

			const expected: StateNodeConfig = {
				initial: 'First',
				states: {
					First: {
						on: {
							FirstToSecond: 'Second',
						},
					},
					Second: {},
				},
			}
			expect(result).toEqual(expected)
		})

		it('should export 2 nodes with 2 edges', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: '27bd6ab5',
						index: 0,
						label: 'First',
						initial: true,
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

			const expected: StateNodeConfig = {
				initial: 'First',
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
			expect(result).toEqual(expected)
		})

		it('should export 3 nodes with 6 edges', () => {
			const data: IData = {
				nodes: [
					{
						shape: 'state',
						type: 'node',
						id: '7d8ff3c3',
						index: 0,
						label: 'First',
						initial: true,
					},
					{
						shape: 'state',
						type: 'node',
						id: '37770e39',
						index: 1,
						label: 'Second',
					},
					{
						shape: 'state',
						type: 'node',
						id: 'f7bef9df',
						index: 2,
						label: 'Third',
					},
				],
				edges: [
					{
						source: '7d8ff3c3',
						target: '37770e39',
						id: '6b8089cb',
						index: 3,
						label: 'FirstToSecond',
					},
					{
						source: '37770e39',
						target: '7d8ff3c3',
						id: 'aefc2051',
						index: 4,
						label: 'SecondToFirst',
					},
					{
						source: '37770e39',
						target: 'f7bef9df',
						id: '803d5bd6',
						index: 5,
						label: 'SecondToThird',
					},
					{
						source: 'f7bef9df',
						target: '37770e39',
						id: '80ff6b0c',
						index: 6,
						label: 'ThirdToSecond',
					},
					{
						source: 'f7bef9df',
						target: '7d8ff3c3',
						id: 'cd1e948b',
						index: 7,
						label: 'ThirdToFirst',
					},
					{
						source: '7d8ff3c3',
						target: 'f7bef9df',
						id: '266b33d5',
						index: 8,
						label: 'FirstToThird',
					},
				],
			}

			const result = exportToXState(data)

			const expected: StateNodeConfig = {
				initial: 'First',
				states: {
					First: {
						on: {
							FirstToSecond: 'Second',
							FirstToThird: 'Third',
						},
					},
					Second: {
						on: {
							SecondToFirst: 'First',
							SecondToThird: 'Third',
						},
					},
					Third: {
						on: {
							ThirdToFirst: 'First',
							ThirdToSecond: 'Second',
						},
					},
				},
			}
			expect(result).toEqual(expected)
		})

		describe('nested states', () => {
			it('should connect from a state to group', () => {
				const data: IData = {
					nodes: [
						{
							shape: 'state',
							type: 'node',
							id: '97431d6f',
							index: 0,
							initial: true,
							label: 'First',
						},
						{
							shape: 'state',
							type: 'node',
							id: 'b66468dc',
							index: 3,
							parent: 'ca850085',
							initial: true,
							label: 'Third',
						},
					],
					edges: [
						{
							source: '97431d6f',
							sourceAnchor: 9,
							target: 'ca850085',
							targetAnchor: 34,
							id: '6469ddcd',
							index: 2,
							label: 'FirstToGroup',
						},
					],
					groups: [
						{
							id: 'ca850085',
							index: 1,
							label: 'SecondGroup',
						},
					],
				}
				const result = exportToXState(data)
				const expected = {
					initial: 'First',
					states: {
						First: {
							on: {
								FirstToGroup: 'SecondGroup',
							},
						},
						SecondGroup: {
							initial: 'Third',
							states: {
								Third: {},
							},
						},
					},
				}
				expect(result).toEqual(expected)
			})

			it('should connect from a group to a state', () => {
				const data: IData = {
					nodes: [
						{
							shape: 'state',
							type: 'node',
							id: 'b66468dc',
							index: 1,
							parent: 'ca850085',
							initial: true,
							label: 'InnerFirst',
						},
						{
							shape: 'state',
							type: 'node',
							id: '97431d6f',
							index: 2,
							initial: false,
							label: 'Second',
						},
					],
					edges: [
						{
							source: 'ca850085',
							sourceAnchor: 1,
							target: '97431d6f',
							targetAnchor: 9,
							id: '11fd64a6',
							index: 3,
							label: 'FirstToSecond',
						},
					],
					groups: [
						{
							id: 'ca850085',
							index: 0,
							label: 'FirstGroup',
							initial: true,
						},
					],
				}
				const result = exportToXState(data)
				const expected = {
					initial: 'FirstGroup',
					states: {
						FirstGroup: {
							initial: 'InnerFirst',
							on: {
								FirstToSecond: 'Second',
							},
							states: { InnerFirst: {} },
						},
						Second: {},
					},
				}
				expect(result).toEqual(expected)
			})

			// it('should ensure a nested state has an initial state')

			// it('should connect to a nested state within a nested state')
		})

		describe('transitions', () => {
			// it('transition guard')
		})

		describe('actions', () => {
			it('onEntry action', () => {
				const data: IData = {
					nodes: [
						{
							shape: 'state',
							type: 'node',
							id: 'e54f9f9b',
							index: 1,
							label: 'Second',
							initial: true,
							onEntry: ['enterSecond'],
						},
						{
							shape: 'state',
							type: 'node',
							id: '05a22f1a',
							index: 3,
							initial: false,
							label: 'First',
							onEntry: ['enterFirst'],
						},
					],
					edges: [
						{
							source: 'e54f9f9b',
							target: '05a22f1a',
							id: '36bc360f',
							index: 2,
							label: 'SecondToFirst',
						},
					],
				}

				const result = exportToXState(data)

				const expected: StateNodeConfig = {
					initial: 'Second',
					states: {
						First: {
							onEntry: ['enterFirst'],
						},
						Second: {
							onEntry: ['enterSecond'],
							on: {
								SecondToFirst: 'First',
							},
						},
					},
				}
				expect(result).toEqual(expected)
			})
			it('onExit action', () => {
				const data: IData = {
					nodes: [
						{
							shape: 'state',
							type: 'node',
							id: 'e54f9f9b',
							index: 1,
							label: 'Second',
							initial: true,
							onExit: ['exitSecond'],
						},
						{
							shape: 'state',
							type: 'node',
							id: '05a22f1a',
							index: 3,
							initial: false,
							label: 'First',
							onExit: ['exitFirst'],
						},
					],
					edges: [
						{
							source: 'e54f9f9b',
							target: '05a22f1a',
							id: '36bc360f',
							index: 2,
							label: 'SecondToFirst',
						},
					],
				}

				const result = exportToXState(data)

				const expected: StateNodeConfig = {
					initial: 'Second',
					states: {
						First: {
							onExit: ['exitFirst'],
						},
						Second: {
							onExit: ['exitSecond'],
							on: {
								SecondToFirst: 'First',
							},
						},
					},
				}
				expect(result).toEqual(expected)
			})
			it('history state', () => {
				const data: IData = {
					nodes: [
						{
							shape: 'state',
							type: 'node',
							id: 'e54f9f9b',
							index: 1,
							label: 'Second',
							initial: true,
						},
						{
							shape: 'state',
							type: 'node',
							id: '05a22f1a',
							index: 3,
							initial: false,
							label: 'First',
						},
					],
					edges: [
						{
							source: 'e54f9f9b',
							target: '05a22f1a',
							id: '36bc360f',
							index: 2,
							label: 'SecondToFirst',
						},
					],
				}

				const result = exportToXState(data)

				const expected: StateNodeConfig = {
					initial: 'Second',
					states: {
						First: {},
						Second: {
							on: {
								SecondToFirst: 'First',
							},
						},
					},
				}
				expect(result).toEqual(expected)
			})
			it('parallel state', () => {
				const data: IData = {
					nodes: [
						{
							shape: 'state',
							type: 'node',
							id: 'e54f9f9b',
							index: 1,
							label: 'Second',
							parent: 'ca850085',
						},
						{
							shape: 'state',
							type: 'node',
							id: '05a22f1a',
							index: 3,
							label: 'Third',
							parent: 'ca850085',
						},
					],
					groups: [
						{
							id: 'ca850085',
							index: 0,
							label: 'FirstGroup',
							initial: true,
							parallel: true,
						},
					],
				}

				const result = exportToXState(data)

				const expected: StateNodeConfig = {
					initial: 'FirstGroup',

					states: {
						FirstGroup: {
							parallel: true,
							states: {
								Second: {},
								Third: {},
							},
						},
					},
				}
				expect(result).toEqual(expected)
			})
		})
	})
})
