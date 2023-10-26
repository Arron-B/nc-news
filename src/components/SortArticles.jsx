import { Dropdown, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { handleAscDesc } from "../utils/utils";

function SortArticles({ order, setOrder, queryString, setQueryString }) {
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
					handleAscDesc(queryString, setQueryString, order, setOrder);
				}}
			/>
		</>
	);
}

export default SortArticles;
