import { Navbar, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllTopics } from "../api";
import { capitaliseFirstLetter } from "../utils/utils";

function NewsNav() {
	const [show, setShow] = useState(false);
	const [topics, setTopics] = useState([]);

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

	function handleClose() {
		setShow(false);
	}
	function toggleShow() {
		setShow(!show);
	}

	return (
		<>
			<Navbar>
				<Button
					variant="secondary"
					onClick={toggleShow}
				>
					Topics
				</Button>
				<Offcanvas
					show={show}
					onHide={handleClose}
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Show articles for:</Offcanvas.Title>
					</Offcanvas.Header>
					<Link
						onClick={() => {
							setShow(!show);
						}}
						to="/articles"
						key="link-all-articles"
					>
						All Articles
					</Link>
					{topics.map((thisTopic) => {
						return (
							<Link
								onClick={() => {
									setShow(!show);
								}}
								to={{
									pathname: "/articles",
									search: `?topic=${thisTopic}`,
								}}
								key={`link-to-${thisTopic}`}
							>
								{capitaliseFirstLetter(thisTopic)}
							</Link>
						);
					})}
				</Offcanvas>
				<Link
					className="mx-auto"
					to="/"
				>
					<Navbar.Brand className="mx-auto">NC News</Navbar.Brand>
				</Link>
			</Navbar>
		</>
	);
}

export default NewsNav;
