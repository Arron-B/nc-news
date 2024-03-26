import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api.js";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import SortArticles from "./SortArticles.jsx";

function Home({ freshHome }) {
	let [searchParams, setSearchParams] = useSearchParams();
	const [displayArticles, setDisplayArticles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [order, setOrder] = useState(searchParams.get("order") || "desc");
	const [topic, setTopic] = useState("");
	const [sortBy, setSortBy] = useState(
		searchParams.get("sort_by") || "created_at"
	);

	useEffect(() => {
		setSortBy("created_at");
		setOrder("desc");
	}, [freshHome]);

	useEffect(() => {
		setIsLoading(true);
		setSearchParams({ sort_by: sortBy, order: order, topic: topic });
		fetchAllArticles({ sortBy, order })
			.then((res) => {
				setDisplayArticles(res.data.articles);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
	}, [searchParams, order, sortBy, topic]);

	if (displayArticles) {
		return (
			<>
				<SortArticles
					order={order}
					setOrder={setOrder}
					setSortBy={setSortBy}
					sortBy={sortBy}
					freshHome={freshHome}
				/>
				{!isLoading ? (
					<main className="article-list">
						{displayArticles.map((thisCard) => {
							return (
								<Link
									key={`home-article-${thisCard.article_id}`}
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
											className="card-img"
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
				) : (
					<Loading />
				)}
			</>
		);
	} else {
		return <Loading />;
	}
}

export default Home;
