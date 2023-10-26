import { Dropdown, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { handleQueryString } from "../utils/utils";

function SortArticles({
	order,
	setOrder,
	searchParams,
	queryString,
	setQueryString,
}) {
	return (
		<>
			<Dropdown>
				<Dropdown.Toggle
					variant="secondary"
					id="sort-by-dropdown"
				>
					Sort By
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href={useLocation().pathname + "?sort_by=created_at"}>
						Date (Default)
					</Dropdown.Item>
					<Dropdown.Item href={useLocation().pathname + "?sort_by=author"}>
						Author
					</Dropdown.Item>
					<Dropdown.Item href={useLocation().pathname + "?sort_by=votes"}>
						Votes
					</Dropdown.Item>
					<Dropdown.Item
						href={useLocation().pathname + "?sort_by=comment_count"}
					>
						Comments
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Form.Check
				type="switch"
				id="asc-desc"
				label={order === "asc" ? "Desc" : "Asc"}
				onChange={() => {
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
				}}
			/>
		</>
	);
}

export default SortArticles;
