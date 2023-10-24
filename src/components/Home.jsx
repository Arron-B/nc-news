import { Form, Card, Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllTopics, fetchArticlesByTopic } from "../api";
import { capitaliseFirstLetter } from "../utils/utils";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Home() {
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState("");
	const [displayArticles, setDisplayArticles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [selectDefault, setSelectDefault] = useState("All");

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
					defaultValue={selectDefault}
				>
					<option
						onClick={(e) => {
							setSelectDefault("All");
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
									setSelectDefault(e.target.value);
									setIsLoading(true);
									setSelectedTopic(e.target.value);
								}}
								value={thisTopic}
								key={`select-${thisTopic}`}
							>
								{capitaliseFirstLetter(thisTopic)}
							</option>
						);
					})}
				</Form.Select>
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
