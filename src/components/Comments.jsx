import { Card, Form, FloatingLabel, Button, Overlay } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { fetchCommentsByArticleId, postComment } from "../api";
import Loading from "./Loading";

function Comments({ articleId, user }) {
	const [comments, setComments] = useState(false);
	const target = useRef(null);
	const [userComment, setUserComment] = useState("");
	const [commentSuccess, setCommentSuccess] = useState(false);
	const [commentFail, setCommentFail] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [postedComment, setPostedComment] = useState(false);

	useEffect(() => {
		fetchCommentsByArticleId(articleId)
			.then((res) => {
				setComments(res.data.comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function handleCommentPost(articleId, username, comment) {
		postComment(articleId, username, comment)
			.then((res) => {
				if (res.status === 201) {
					setPostedComment(userComment);
					setUserComment("");
					setCommentSuccess(true);

					setTimeout(() => {
						setCommentSuccess(false);
					}, 5000);
				}
			})
			.catch((err) => {
				setErrMsg(err.message);
				setCommentFail(true);
				setTimeout(() => {
					setCommentFail(false);
				}, 5000);
			});
	}

	function ShowPostedComment() {
		return (
			<Card key={`comment-new`}>
				<p>{user.username}</p>
				<Card.Body>{postedComment}</Card.Body>
			</Card>
		);
	}

	if (comments) {
		return (
			<section
				className="mt-2"
				aria-label="comments section"
			>
				<Form
					className="my-2"
					style={{ height: "10rem" }}
					onSubmit={(e) => {
						e.preventDefault();
						handleCommentPost(articleId, user.username, userComment);
					}}
				>
					<FloatingLabel
						style={{ height: "7rem" }}
						controlId="commentInput"
						label="Write a comment here"
					>
						<Form.Control
							style={{ height: "100%", width: "100%" }}
							type="text"
							value={userComment}
							onChange={(e) => {
								setUserComment(e.target.value);
							}}
						></Form.Control>
					</FloatingLabel>
					<Button
						type="submit"
						className="my-2"
						ref={target}
					>
						Submit
					</Button>
				</Form>

				<Overlay
					target={target.current}
					show={commentSuccess}
					placement="bottom"
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
							Comment Successful!
						</div>
					)}
				</Overlay>
				<Overlay
					target={target.current}
					show={commentFail}
					placement="bottom"
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
				{postedComment ? <ShowPostedComment /> : null}
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
