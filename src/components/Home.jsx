import { Form, Card, Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllTopics, fetchArticlesByTopic } from "../api";
import { capitaliseFirstLetter } from "../utils/utils";

function Home() {
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState("");
	const [displayArticles, setDisplayArticles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchAllTopics()
			.then((res) => {
				console.log("fetching topics");
				const fetchedTopics = res.data.topics.map(
					(thisTopic) => thisTopic.slug
				);
				setTopics(fetchedTopics);
				console.log("topics fetched");
			})
			.catch((err) => {
				console.log(err);
			}, []);
	}, []);

	useEffect(() => {
		console.log("fetching all by topic");
		setIsLoading(true);
		fetchArticlesByTopic(selectedTopic).then((res) => {
			setDisplayArticles(res.data.articles);
			setIsLoading(false);
		});
	}, [selectedTopic]);

	if (!isLoading) {
		return (
			<>
				<Form.Select size="sm">
					<option
						onClick={(e) => setSelectedTopic(e.target.value)}
						value={""}
						key="All"
					>
						All
					</option>
					{topics.map((thisTopic) => {
						return (
							<option
								onClick={(e) => setSelectedTopic(e.target.value)}
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
						<Card key={thisCard.article_id}>
							<Card.Title>{thisCard.title}</Card.Title>
							<Card.Img
								variant="top"
								src={thisCard.article_img_url}
							/>
							<Card.Text>{thisCard.votes}</Card.Text>
							<Card.Text>{thisCard.comment_count}</Card.Text>
						</Card>
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
