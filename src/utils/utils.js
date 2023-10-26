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

export function handleAscDesc(queryString, setQueryString, order, setOrder) {
	const params = queryString;
	if (params.length === 0) {
		setQueryString(queryString + "?order=" + order);
	}
	if (params.length > 0 && !params.includes("order")) {
		setQueryString(queryString + "&order=" + order);
	}
	if (
		params.length > 0 &&
		params.includes("order") &&
		params.includes("sort_by")
	) {
		const paramsArr = params.split("&");
		const newParams = paramsArr.map((section) => {
			if (section.includes("order" && "desc")) {
				return "order=asc";
			}
			if (section.includes("order" && "asc")) {
				return "order=desc";
			}
			return section;
		});
		console.log(newParams.join("&"));
		setQueryString(newParams.join("&"));
	}
	if (
		params.length > 0 &&
		params.includes("order") &&
		!params.includes("sort_by")
	) {
		if (params.includes("asc")) setQueryString("?order=desc");

		if (params.includes("desc")) setQueryString("?order=asc");
	}
	if (order === "desc") {
		setOrder("asc");
	} else {
		setOrder("desc");
	}
}
