import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../api";
import {
	Card,
	Container,
	Spinner,
	Button,
	DropdownButton,
} from "react-bootstrap";
import { capitaliseFirstLetter } from "../utils/utils";

function Article() {
	const { article_id } = useParams();

	const [article, setArticle] = useState(false);
	const [votes, setVotes] = useState(0);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		console.log("fetching article");
		fetchArticleById(article_id)
			.then((res) => {
				setArticle(res.data.article);
				setVotes(res.data.article.votes);
				return fetchCommentsByArticleId(article_id);
			})
			.then((res) => {
				setComments(res.data.comments);
			});
	}, []);

	if (article) {
		return (
			<Card>
				<Card.Title>{article.title}</Card.Title>
				<Card.Subtitle>Posted: {article.created_at}</Card.Subtitle>
				<Card.Subtitle>{capitaliseFirstLetter(article.topic)}</Card.Subtitle>
				<Card.Subtitle>Author: {article.author}</Card.Subtitle>
				<Card.Img
					variant="top"
					src={article.article_img_url}
				/>
				<Card.Text>{article.body}</Card.Text>
				<Card.Text>Votes: {votes}</Card.Text>
				<Button
					variant="light"
					size="sm"
					onClick={() => console.log("Light")}
				>
					Vote Up
				</Button>
				<Button
					variant="light"
					size="sm"
					onClick={() => console.log("Light")}
				>
					Vote Down
				</Button>
				<DropdownButton
					title="Comments"
					id="comments-dropdown"
				>
					<section aria-label="comments section">
						{comments.map((comment) => {
							return (
								<Card key={`comment${comment.comment_id}`}>
									<Card.Subtitle>{comment.author}</Card.Subtitle>
									<Card.Body>{comment.body}</Card.Body>
								</Card>
							);
						})}
					</section>
				</DropdownButton>
			</Card>
		);
	} else {
		return (
			<Container className="mx-auto my-auto w-100 d-flex flex-column align-items-center">
				<Spinner
					animation="border"
					role="status"
				>
					<span className="visually-hidden "></span>
				</Spinner>
				<p>Loading...</p>
			</Container>
		);
	}
}

export default Article;
