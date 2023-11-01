import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, voteOnArticle } from "../api.js";
import { Card, Container, Button, Overlay } from "react-bootstrap";
import { capitaliseFirstLetter } from "../utils/utils.js";
import Comments from "./Comments";
import Loading from "./Loading";
import BadArticleRequest from "./BadArticleRequest.jsx";
import { format } from "date-fns";

function Article({ user }) {
	const { article_id } = useParams();

	const target = useRef(null);

	const [article, setArticle] = useState(false);
	const [votes, setVotes] = useState(0);

	const [voteFail, setVoteFail] = useState(false);
	const [voteSuccess, setVoteSuccess] = useState(false);
	const [voteErrMsg, setVoteErrMsg] = useState("Something went wrong!");
	const [errMsg, setErrMsg] = useState(""); //error for bad article
	const [votesDisabled, setVotesDisabled] = useState(false);
	const [showComments, setShowComments] = useState(false);

	useEffect(() => {
		fetchArticleById(article_id)
			.then((res) => {
				setArticle(res.data.article);
				setVotes(res.data.article.votes);
			})
			.catch((err) => {
				console.log(err);
				setErrMsg(err.response.data.msg);
			});
	}, []);

	function handleVote(increment) {
		const currentVotes = votes;
		setVotesDisabled(true);
		setVotes(currentVotes + increment);
		voteOnArticle(article_id, increment)
			.then((res) => {
				if (res.status === 200) {
					setVoteSuccess(true);
					setTimeout(() => {
						setVoteSuccess(false);
					}, 5000);
				}
			})
			.catch((err) => {
				setVoteErrMsg(err.message);
				setVoteFail(true);
				setVotes(currentVotes);

				setTimeout(() => {
					setVotesDisabled(false);
					setVoteFail(false);
				}, 5000);
			});
	}

	if (article) {
		return (
			<article className=" d-flex flex-column justify-content-around">
				<h2 className="fw-bold article-title">{article.title}</h2>

				<div className="d-flex flex-column align-items-center">
					<img
						className="article-img"
						src={article.article_img_url}
					></img>
					<div className="article-info fw-bold w-100 d-flex justify-content-evenly align-items-center mb-2">
						<div
							className="m-0 d-flex flex-column"
							style={{ width: "30%", fontSize: "0.9rem" }}
						>
							<p className="m-0">Published:</p>
							<p className="m-0">
								{format(
									new Date(article.created_at.split("T")[0]),
									"dd/MM/yyyy"
								)}
							</p>
						</div>
						<div
							className=" m-0 border border-black border-top-0 border-bottom-0 d-flex flex-column"
							style={{ width: "30%", fontSize: "0.9rem" }}
						>
							<p className="m-0">Topic:</p>
							<p className="m-0">{capitaliseFirstLetter(article.topic)}</p>
						</div>
						<div
							className="m-0 d-flex flex-column"
							style={{ width: "30%", fontSize: "0.9rem" }}
						>
							<p className="m-0">Author:</p>
							<p className="m-0"> {article.author}</p>
						</div>
					</div>
				</div>
				<p>{article.body}</p>
				{votes >= 0 ? (
					<div className="d-flex mx-auto">
						<span className="material-symbols-outlined">thumb_up</span>{" "}
						<p>{votes}</p>
					</div>
				) : (
					<div className="d-flex mx-auto">
						<span className="material-symbols-outlined">thumb_down</span>
						<p>{votes}</p>
					</div>
				)}
				{user ? (
					<Container className="d-flex align-items-center justify-content-center gap-2 mb-1">
						<Button
							className="w-25 vote-button py-0"
							variant="success"
							size="md"
							disabled={votesDisabled}
							ref={target}
							onClick={(e) => {
								e.preventDefault();
								handleVote(1);
							}}
						>
							<span className="material-symbols-outlined">thumb_up</span>
						</Button>
						<Button
							className="w-25 vote-button py-0"
							variant="danger"
							size="md"
							disabled={votesDisabled}
							ref={target}
							onClick={(e) => {
								e.preventDefault();
								handleVote(-1);
							}}
						>
							<span className="material-symbols-outlined">thumb_down</span>
						</Button>
						<Overlay
							target={target.current}
							show={voteSuccess}
							placement="top"
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
							placement="top"
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
									{voteErrMsg}
								</div>
							)}
						</Overlay>
					</Container>
				) : null}
				<Button
					className="w-50 my-1 comments-button"
					variant="secondary"
					aria-label="show/hide comments button"
					id="comments-button"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setShowComments(!showComments);
					}}
				>
					Comments
				</Button>
				{showComments ? (
					<Comments
						articleId={article_id}
						user={user}
					/>
				) : null}
			</article>
		);
	}

	if (errMsg) {
		return <BadArticleRequest errMsg={errMsg} />;
	} else {
		return <Loading />;
	}
}

export default Article;
