import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import SortArticles from "./SortArticles.jsx";

function Home() {
	let [searchParams, setSearchParams] = useSearchParams();
	const [displayArticles, setDisplayArticles] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [order, setOrder] = useState("desc");
	const [sortBy, setSortBy] = useState("created_at");

	useEffect(() => {
		console.log("fetching all articles");
		const currentParams = Object.fromEntries([...searchParams]);
		setSearchParams({ sort_by: sortBy, order: order });
		fetchAllArticles(currentParams)
			.then((res) => {
				setDisplayArticles(res.data.articles);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
	}, [searchParams, order, sortBy]);

	if (!isLoading) {
		return (
			<>
				<SortArticles
					order={order}
					setOrder={setOrder}
					setSearchParams={setSearchParams}
					searchParams={searchParams}
				/>
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
