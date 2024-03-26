import { Form } from "react-bootstrap";
import { capitaliseFirstLetter } from "../utils/utils.js";

function SortArticles({ order, setOrder, setSortBy, sortBy, freshHome }) {
	return (
		<div className="sort-div d-flex justify-content-around mb-2">
			<Form.Select
				onChange={(e) => {
					setSortBy(e.target.value);
				}}
				className="w-50"
				size="sm"
			>
				<option value={"created_at"}>Date</option>
				<option value={"comment_count"}>Comments</option>
				<option value={"votes"}>Votes</option>
				<option value={"author"}>Author</option>
			</Form.Select>

			<Form.Check
				className="w-25"
				type="switch"
				id="asc-desc"
				label={capitaliseFirstLetter(order)}
				onChange={() => {
					setOrder(order === "desc" ? "asc" : "desc");
				}}
			/>
		</div>
	);
}

export default SortArticles;
