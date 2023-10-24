import { Form, Card, Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllTopics, fetchArticlesByTopic } from "../api";
import { capitaliseFirstLetter } from "../utils/utils";
import { Link } from "react-router-dom";

function Home() {
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState("");
	const [displayArticles, setDisplayArticles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchAllTopics()
			.then((res) => {
				const fetchedTopics = res.data.topics.map(
					(thisTopic) => thisTopic.slug
				);
				setTopics(fetchedTopics);
			})
			.catch((err) => {
				console.log(err);
			}, []);
	}, []);

	useEffect(() => {
		fetchArticlesByTopic(selectedTopic).then((res) => {
			setDisplayArticles(res.data.articles);
			setIsLoading(false);
		});
	}, [selectedTopic]);

	if (!isLoading) {
		return (
			<>
				<Form.Select
					size="sm"
					title="topics"
				>
					<option
						onClick={(e) => {
							setSelectedTopic(e.target.value);
						}}
						aria-label="show all articles"
						value={""}
						key="All"
					>
						All
					</option>
					{topics.map((thisTopic) => {
						return (
							<option
								aria-label={`Show all articles for the topic ${thisTopic}`}
								onClick={(e) => {
									e.preventDefault();
									setSelectedTopic(e.target.value);
								}}
								value={thisTopic}
								key={thisTopic}
							>
								{capitaliseFirstLetter(thisTopic)}
							</option>
						);
					})}
				</Form.Select>
				{displayArticles.map((thisCard) => {
					return (
						<Link to={`/articles/${thisCard.article_id}`}>
							<Card
								key={thisCard.article_id}
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

export default Home;
