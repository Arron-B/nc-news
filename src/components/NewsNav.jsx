import { Navbar, Button, Offcanvas, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllTopics } from "../api";
import { capitaliseFirstLetter } from "../utils/utils";

function NewsNav({
	user,
	LoginButton,
	setShowAccounts,
	setFreshHome,
	freshHome,
}) {
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
	if (user) {
		return (
			<>
				<Navbar>
					<Button
						variant="secondary"
						onClick={toggleShow}
						size="sm"
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
								setFreshHome(!freshHome);
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
						onClick={() => {
							setFreshHome(!freshHome);
						}}
					>
						<Navbar.Brand className="mx-auto">NC News</Navbar.Brand>
					</Link>
					{user ? (
						<Image
							className="w-25 img-fluid"
							alt="Your user avatar image"
							src={user.avatar_url}
							roundedCircle
						></Image>
					) : (
						<LoginButton setShowAccounts={setShowAccounts} />
					)}
				</Navbar>
			</>
		);
	}
}

export default NewsNav;
