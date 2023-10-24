import { Card, Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../api";
import Loading from "./Loading";

function Comments({ articleId }) {
	const [comments, setComments] = useState(false);

	useEffect(() => {
		fetchCommentsByArticleId(articleId)
			.then((res) => {
				console.log(res);
				setComments(res.data.comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (comments) {
		return (
			<section aria-label="comments section">
				{comments.map((comment) => {
					return (
						<Card key={`comment${comment.comment_id}`}>
							<p>{comment.author}</p>
							<Card.Body>{comment.body}</Card.Body>
						</Card>
					);
				})}
			</section>
		);
	} else {
		return <Loading />;
	}
}

export default Comments;
