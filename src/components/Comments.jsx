import { Card, Form, FloatingLabel, Button, Overlay } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { fetchCommentsByArticleId, postComment, deleteComment } from "../api";
import { removeDeletedComment } from "../utils/utils";
import Loading from "./Loading";

function Comments({ articleId, user }) {
	const [comments, setComments] = useState(false);
	const target = useRef(null);
	const deleteRef = useRef([]);
	const [userComment, setUserComment] = useState("");
	const [commentSuccess, setCommentSuccess] = useState(false);
	const [commentFail, setCommentFail] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [postedComment, setPostedComment] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [tempComment, setTempComment] = useState(false);
	const [deleteFail, setDeleteFail] = useState("");
	const [inactiveButtons, setInactiveButtons] = useState([]);

	useEffect(() => {
		deleteRef.current = deleteRef.current.slice(0, comments.length);
	}, [comments]);

	useEffect(() => {
		fetchCommentsByArticleId(articleId)
			.then((res) => {
				setComments(res.data.comments);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);

	function handleCommentPost(articleId, username, comment) {
		setInactiveButtons([...inactiveButtons, "submit"]);
		postComment(articleId, username, comment)
			.then((res) => {
				if (res.status === 201) {
					setPostedComment(userComment);
					setUserComment("");
					setCommentSuccess(true);
					setTempComment(false);
					setRefresh(!refresh);
					setTimeout(() => {
						setCommentSuccess(false);
						const newInactiveButtons = [...inactiveButtons];
						newInactiveButtons.splice(newInactiveButtons.indexOf("show"), 1);
						setInactiveButtons(newInactiveButtons);
					}, 5000);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrMsg("Failed to post comment");
				setCommentFail(true);
				setTempComment(false);
				setTimeout(() => {
					setCommentFail(false);
					const newInactiveButtons = [...inactiveButtons];
					newInactiveButtons.splice(newInactiveButtons.indexOf("show"), 1);
					setInactiveButtons(newInactiveButtons);
				}, 5000);
			});
	}

	function ShowPostedComment() {
		{
			return tempComment ? (
				<Card key={`comment-new`}>
					<p>{user.username}</p>
					<Card.Body className="mx-auto">{postedComment}</Card.Body>
					<Loading />
				</Card>
			) : null;
		}
	}

	function handleDeleteComment(id, deleteButtonRef) {
		setInactiveButtons([...inactiveButtons, deleteButtonRef]);
		deleteComment(id)
			.then((res) => {
				setTimeout(() => {
					const newInactiveButtons = [...inactiveButtons];
					newInactiveButtons.splice(
						newInactiveButtons.indexOf(deleteButtonRef),
						1
					);
					setInactiveButtons(newInactiveButtons);
				}, 3000);
				if (res.status === 204) {
					const updateComments = [...comments];
					setComments(removeDeletedComment(updateComments, id));
				}
			})
			.catch((err) => {
				setTimeout(() => {
					const newInactiveButtons = [...inactiveButtons];
					newInactiveButtons.splice(
						newInactiveButtons.indexOf(deleteButtonRef),
						1
					);
					setInactiveButtons(newInactiveButtons);
				}, 3000);
				setDeleteFail(deleteButtonRef);
				setTimeout(() => {
					setDeleteFail(false);
				}, 3000);
			});
	}

	if (comments) {
		return (
			<section
				className="mt-2"
				aria-label="comments section"
			>
				{user ? (
					<Form
						className="my-2"
						style={{ height: "10rem" }}
						onSubmit={(e) => {
							e.preventDefault();
							handleCommentPost(articleId, user.username, userComment);
							setPostedComment(userComment);
							setTempComment(true);
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
							disabled={inactiveButtons.includes("submit")}
						>
							Submit
						</Button>
					</Form>
				) : null}

				<Overlay
					target={target.current}
					show={commentSuccess}
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
							Comment Successful!
						</div>
					)}
				</Overlay>
				<Overlay
					target={target.current}
					show={commentFail}
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
							{errMsg}
						</div>
					)}
				</Overlay>
				{tempComment ? <ShowPostedComment /> : null}
				{comments.map((comment, i) => {
					return (
						<Card key={`comment${comment.comment_id}`}>
							<p>{comment.author}</p>
							<Card.Body className="mx-auto">{comment.body}</Card.Body>
							{comment.author === user.username ? (
								<Button
									onClick={() => {
										handleDeleteComment(comment.comment_id, i);
									}}
									ref={(el) => (deleteRef.current[i] = el)}
									disabled={inactiveButtons.includes(i)}
									variant="danger"
									className="w-25 mx-auto"
								>
									Delete
								</Button>
							) : null}
							<Overlay
								target={deleteRef.current[i]}
								show={deleteFail === i}
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
										Failed to delete comment
									</div>
								)}
							</Overlay>
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
