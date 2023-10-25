import { Form, Card, Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import { capitaliseFirstLetter } from "../utils/utils";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Home() {
	const [displayArticles, setDisplayArticles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchAllArticles().then((res) => {
			setDisplayArticles(res.data.articles);
			setIsLoading(false);
		});
	}, []);

	if (!isLoading) {
		return (
			<>
				{displayArticles.map((thisCard) => {
					return (
						<Link
							key={`home-article-${thisCard.article_id}`}
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

export default Home;
