export const save = (graph: object) => {
	window.localStorage.setItem('graph', JSON.stringify(graph))
}

export const load = () => {
	const graph = window.localStorage.getItem('graph')
	if (graph) {
		return JSON.parse(graph)
	}
	return null
}
