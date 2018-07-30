export const save = (graph: object) => {
	console.log('saving', graph)
	window.localStorage.setItem('graph', JSON.stringify(graph))
}

export const load = () => {
	const graph = window.localStorage.getItem('graph')
	console.log('loading', graph)
	if (graph) {
		return JSON.parse(graph)
	}
	return null
}
