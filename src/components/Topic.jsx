import { useSearchParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { capitaliseFirstLetter } from "../utils/utils.js";
import { fetchAllArticles } from "../api.js";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SortArticles from "./SortArticles";
import BadArticleRequest from "./BadArticleRequest";

function Topic({ freshHome }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [displayArticles, setDisplayArticles] = useState(false);
	const [topic, setTopic] = useState(searchParams.get("topic") || "");
	const [order, setOrder] = useState(searchParams.get("order") || "desc");
	const [sortBy, setSortBy] = useState(
		searchParams.get("sort_by") || "created_at"
	);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		setTopic(searchParams.get("topic") || "");
	}, [freshHome]);

	useEffect(() => {
		setSearchParams({ sort_by: sortBy, order: order, topic: topic });
		setIsLoading(true);
		setErrMsg("");
		fetchAllArticles({ sortBy, order, topic })
			.then((res) => {
				setDisplayArticles(res.data.articles);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setErrMsg(err.response.data.msg);
			});
	}, [topic, sortBy, order]);

	if (displayArticles) {
		return (
			<>
				<SortArticles
					order={order}
					setOrder={setOrder}
					setSortBy={setSortBy}
				/>
				{!isLoading ? (
					<>
						<h1>{topic ? capitaliseFirstLetter(topic) : "All Articles"}</h1>
						<main className="article-list">
							{displayArticles.map((thisCard) => {
								return (
									<Link
										key={`${topic}-article-${thisCard.article_id}`}
										to={`/articles/${thisCard.article_id}`}
									>
										<Card
											className="article-card mb-2"
											aria-label={`A card showing the article titled ${thisCard.title}`}
										>
											<div className="card-title">
												<Card.Title>{thisCard.title}</Card.Title>
											</div>
											<Card.Img
												className="object-fit-scale card-img"
												variant="top"
												alt={`an image for the article titled ${thisCard.title}`}
												src={thisCard.article_img_url}
											/>
											<div className="card-icons d-flex align-items-center justify-content-around">
												<div className="d-flex align-items-center">
													{thisCard.votes >= 0 ? (
														<span className="material-symbols-outlined">
															thumb_up
														</span>
													) : (
														<span className="material-symbols-outlined">
															thumb_down
														</span>
													)}

													<p className="my-0">{thisCard.votes}</p>
												</div>
												<div className="d-flex align-items-center">
													<span className="material-symbols-outlined">
														comment
													</span>
													<p className="my-0">{thisCard.comment_count}</p>
												</div>
											</div>
										</Card>
									</Link>
								);
							})}
						</main>
					</>
				) : (
					<Loading />
				)}
			</>
		);
	}
	if (!displayArticles && errMsg) {
		return <BadArticleRequest errMsg={errMsg} />;
	} else {
		return <Loading />;
	}
}

export default Topic;
