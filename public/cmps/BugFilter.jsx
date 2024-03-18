const { useState, useEffect } = React



export function BugFilter({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function onFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

	function handleChange({ target }) {
		let { value, name: field, type } = target
		if (type === 'number') value = +value
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
	}


	return <section className="bug-filter">
		<h2>Filter our bugs</h2>
		<form onSubmit={onFilter}>
			<label htmlFor="title">title</label>
			<input type="text"
				id="title"
				name="title"
				value={filterByToEdit.title}
				onChange={handleChange}
				placeholder="By title" />


			<label htmlFor="description">description</label>
			<input type="txt"
				id="description"
				name="description"
				value={filterByToEdit.description || ''}
				onChange={handleChange}
				placeholder="By description" />

			<button>Filter</button>
		</form>
	</section>
}