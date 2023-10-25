import { useSearchParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { capitaliseFirstLetter } from "../utils/utils";
import { fetchArticlesByTopic, fetchAllArticles } from "../api";
import { useState, useEffect } from "react";
import Loading from "./Loading";

function Topic() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [displayArticles, setDisplayArticles] = useState(false);
	const [topic, setTopic] = useState(searchParams.get("topic"));
	const { search } = useLocation();

	useEffect(() => {
		setTopic(searchParams.get("topic"));
		setDisplayArticles(false);
	}, [search]);

	useEffect(() => {
		if (!topic) {
			fetchAllArticles().then((res) => {
				setDisplayArticles(res.data.articles);
			});
		} else {
			fetchArticlesByTopic(topic).then((res) => {
				setDisplayArticles(res.data.articles);
			});
		}
	}, [topic]);

	if (displayArticles) {
		return (
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
		);
	} else {
		return <Loading />;
	}
}

export default Topic;
