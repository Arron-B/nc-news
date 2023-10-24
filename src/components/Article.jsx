import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, voteOnArticle } from "../api";
import {
	Card,
	Container,
	Spinner,
	Button,
	DropdownButton,
	Overlay,
} from "react-bootstrap";
import { capitaliseFirstLetter } from "../utils/utils";
import Comments from "./Comments";
import Loading from "./Loading";

function Article() {
	const { article_id } = useParams();

	const target = useRef(null);

	const [article, setArticle] = useState(false);
	const [votes, setVotes] = useState(0);

	const [voteFail, setVoteFail] = useState(false);
	const [voteSuccess, setVoteSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("Something went wrong!");
	const [votesDisabled, setVotesDisabled] = useState(false);
	const [showComments, setShowComments] = useState(false);

	useEffect(() => {
		fetchArticleById(article_id).then((res) => {
			setArticle(res.data.article);
			setVotes(res.data.article.votes);
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
			<article className="d-flex flex-column">
				<h2>{article.title}</h2>
				<p>Posted: {article.created_at}</p>
				<p>{capitaliseFirstLetter(article.topic)}</p>
				<p>Author: {article.author}</p>
				<Card.Img
					variant="top"
					alt={`an image for article titled ${article.title}`}
					src={article.article_img_url}
				/>
				<p>{article.body}</p>
				<p>Votes: {votes}</p>
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
				<Button
					aria-label="show/hide comments button"
					id="comments-button"
					onClick={(e) => {
						e.preventDefault();
						setShowComments(!showComments);
					}}
				>
					Comments
				</Button>
				{showComments ? <Comments articleId={article_id} /> : null}
			</article>
		);
	} else {
		return <Loading />;
	}
}

export default Article;
