import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
	fetchArticleById,
	fetchCommentsByArticleId,
	voteOnArticle,
} from "../api";
import {
	Card,
	Container,
	Spinner,
	Button,
	DropdownButton,
	Overlay,
} from "react-bootstrap";
import { capitaliseFirstLetter } from "../utils/utils";

function Article() {
	const { article_id } = useParams();

	const target = useRef(null);

	const [article, setArticle] = useState(false);
	const [votes, setVotes] = useState(0);
	const [comments, setComments] = useState([]);
	const [voteFail, setVoteFail] = useState(false);
	const [voteSuccess, setVoteSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("Something went wrong!");
	const [votesDisabled, setVotesDisabled] = useState(false);

	useEffect(() => {
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

	function handleVote(increment) {
		setVotes(votes + increment);
		voteOnArticle(article_id, increment)
			.then((res) => {
				setVotesDisabled(true);
				if (res.status === 200) {
					setVoteSuccess(true);
					setTimeout(() => {
						setVoteSuccess(false);
					}, 5000);
				}
			})
			.catch((err) => {
				setErrMsg(err.message);
				setVoteFail(true);
				setVotesDisabled(false);
				setVotes(votes - increment);
				setTimeout(() => {
					setVoteFail(false);
				}, 5000);
			});
	}

	if (article) {
		return (
			<Card>
				<Card.Title>{article.title}</Card.Title>
				<Card.Subtitle>Posted: {article.created_at}</Card.Subtitle>
				<Card.Subtitle>{capitaliseFirstLetter(article.topic)}</Card.Subtitle>
				<Card.Subtitle>Author: {article.author}</Card.Subtitle>
				<Card.Img
					variant="top"
					alt={`an image for article titled ${article.title}`}
					src={article.article_img_url}
				/>
				<Card.Text>{article.body}</Card.Text>
				<Card.Text>Votes: {votes}</Card.Text>
				<Button
					className="w-50"
					variant="light"
					size="sm"
					disabled={votesDisabled}
					ref={target}
					onClick={(e) => {
						e.preventDefault();
						handleVote(1);
					}}
				>
					Vote Up
				</Button>
				<Button
					className="w-50"
					variant="light"
					size="sm"
					disabled={votesDisabled}
					ref={target}
					onClick={(e) => {
						e.preventDefault();
						handleVote(-1);
					}}
				>
					Vote Down
				</Button>
				<Overlay
					target={target.current}
					show={voteSuccess}
					placement="right"
				>
					{({
						placement: _placement,
						arrowProps: _arrowProps,
						show: _show,
						popper: _popper,
						hasDoneInitialMeasure: _hasDoneInitialMeasure,
						...props
					}) => (
						<div
							{...props}
							style={{
								position: "absolute",
								backgroundColor: "rgba(28, 184, 28, 0.85)",
								padding: "2px 10px",
								color: "white",
								borderRadius: 3,
								...props.style,
							}}
						>
							Vote Successful!
						</div>
					)}
				</Overlay>
				<Overlay
					target={target.current}
					show={voteFail}
					placement="right"
				>
					{({
						placement: _placement,
						arrowProps: _arrowProps,
						show: _show,
						popper: _popper,
						hasDoneInitialMeasure: _hasDoneInitialMeasure,
						...props
					}) => (
						<div
							{...props}
							style={{
								position: "absolute",
								backgroundColor: "rgba(184, 28, 28, 0.85)",
								padding: "2px 10px",
								color: "white",
								borderRadius: 3,
								...props.style,
							}}
						>
							{errMsg}
						</div>
					)}
				</Overlay>
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
