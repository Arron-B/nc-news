import { Form } from "react-bootstrap";

function SortArticles({ order, setOrder, setSearchParams }) {
	return (
		<>
			<Form.Select size="sm">
				<option
					onClick={() => {
						setSearchParams({ sort_by: "created_at" });
					}}
				>
					Date
				</option>
				<option
					onClick={() => {
						setSearchParams({ sort_by: "comment_count" });
					}}
				>
					Comments
				</option>
				<option
					onClick={() => {
						setSearchParams({ sort_by: "votes" });
					}}
				>
					Votes
				</option>
				<option
					onClick={() => {
						setSearchParams({ sort_by: "comment_count" });
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
					setSearchParams({ order: order === "desc" ? "asc" : "desc" });
				}}
			/>
		</>
	);
}

export default SortArticles;
