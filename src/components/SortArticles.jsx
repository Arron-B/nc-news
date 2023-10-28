import { Form } from "react-bootstrap";
import { capitaliseFirstLetter } from "../utils/utils.js";

function SortArticles({ order, setOrder, setSortBy }) {
	return (
		<div className="d-flex justify-content-around mb-2">
			<Form.Select
				className="w-50"
				size="sm"
			>
				<option
					onClick={() => {
						setSortBy("");
					}}
				>
					Date
				</option>
				<option
					onClick={() => {
						setSortBy("comment_count");
					}}
				>
					Comments
				</option>
				<option
					onClick={() => {
						setSortBy("votes");
					}}
				>
					Votes
				</option>
				<option
					onClick={() => {
						setSortBy("author");
					}}
				>
					Author
				</option>
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
