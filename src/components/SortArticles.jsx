import { Form } from "react-bootstrap";

function SortArticles({ order, setOrder, setSortBy }) {
	return (
		<>
			<Form.Select size="sm">
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
				type="switch"
				id="asc-desc"
				label={order}
				onChange={() => {
					setOrder(order === "desc" ? "asc" : "desc");
				}}
			/>
		</>
	);
}

export default SortArticles;
