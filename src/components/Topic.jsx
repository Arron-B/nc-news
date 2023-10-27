import { useSearchParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { capitaliseFirstLetter } from "../utils/utils";
import { fetchAllArticles } from "../api";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SortArticles from "./SortArticles";

function Topic({ freshHome }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [displayArticles, setDisplayArticles] = useState(false);
	const [topic, setTopic] = useState(searchParams.get("topic") || "");
	const [order, setOrder] = useState(searchParams.get("order") || "desc");
	const [sortBy, setSortBy] = useState(
		searchParams.get("sort_by") || "created_at"
	);

	useEffect(() => {
		setSortBy("created_at");
		setOrder("desc");
		setTopic(searchParams.get("topic") || "");
	}, [freshHome, searchParams]);

	useEffect(() => {
		setIsLoading(true);
		fetchAllArticles({ sortBy, order, topic })
			.then((res) => {
				setDisplayArticles(res.data.articles);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
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
						{displayArticles.map((thisCard) => {
							return (
								<Link
									key={`${topic}-article-${thisCard.article_id}`}
									to={`/articles/${thisCard.article_id}`}
								>
									<Card
										aria-label={`A card showing the article titled ${thisCard.title}`}
									>
										<Card.Title>{thisCard.title}</Card.Title>
										<Card.Img
											variant="top"
											alt={`an image for the article titled ${thisCard.title}`}
											src={thisCard.article_img_url}
										/>
										<Card.Text>votes: {thisCard.votes}</Card.Text>
										<Card.Text>Comments: {thisCard.comment_count}</Card.Text>
									</Card>
								</Link>
							);
						})}
					</>
				) : (
					<Loading />
				)}
			</>
		);
	} else {
		return <Loading />;
	}
}

export default Topic;
