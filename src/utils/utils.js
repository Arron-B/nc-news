export function capitaliseFirstLetter(str) {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function handleQueryString(searchParams) {
	const params = {};
	let paramCount = 0;
	if (searchParams.get("sort_by")) {
		params.sortBy = searchParams.get("sort_by");
		paramCount++;
	}
	if (searchParams.get("order")) {
		params.order = searchParams.get("order");
		paramCount++;
	}

	if (paramCount === 0) return "";

	if (paramCount === 2) {
		return `?sort_by=${params.sortBy}&order=${params.order}`;
	}
	if (paramCount === 1 && params.sortBy) return `?sort_by=${params.sortBy}`;

	if (paramCount === 1 && params.order) return `?order=${params.order}`;
}
