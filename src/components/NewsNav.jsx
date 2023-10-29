import { Navbar, Button, Offcanvas, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllTopics } from "../api.js";
import { capitaliseFirstLetter } from "../utils/utils.js";
import logo from "./logo.png";

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

	return (
		<>
			<Navbar className="mobile-nav d-flex justify-content-around">
				<Button
					className="hamburger-button"
					variant="secondary"
					onClick={toggleShow}
					size="sm"
				>
					<div className="hamburger-bar bg-white"></div>
					<div className="hamburger-bar bg-white"></div>
					<div className="hamburger-bar bg-white"></div>
				</Button>
				<Offcanvas
					className="d-flex p-2 justify-content-evenly align-items-center"
					show={show}
					onHide={handleClose}
				>
					<Offcanvas.Header
						className="topic-select-head"
						closeButton
					>
						<Offcanvas.Title>Choose a topic</Offcanvas.Title>
					</Offcanvas.Header>
					<Link
						className="fs-1"
						onClick={() => {
							setShow(!show);
							setFreshHome(!freshHome);
						}}
						to="/articles"
						key="link-all-articles"
					>
						All Topics
					</Link>
					{topics.map((thisTopic) => {
						return (
							<Link
								className="fs-1"
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
					<Image
						className="logo"
						src={logo}
					></Image>
				</Link>
				{user ? (
					<Image
						className="user-img img-fluid"
						alt="Your user avatar image"
						src={user.avatar_url}
						roundedCircle
					></Image>
				) : (
					<LoginButton setShowAccounts={setShowAccounts} />
				)}
			</Navbar>
			<div className="empty-space"></div>
			<div className="empty-space-left"></div>
			<Navbar className="desktop-nav">
				{!user ? (
					<LoginButton setShowAccounts={setShowAccounts} />
				) : (
					<Image
						className="user-img img-fluid"
						alt="Your user avatar image"
						src={user.avatar_url}
						roundedCircle
					></Image>
				)}
				<Link
					className="mx-auto"
					to="/"
					onClick={() => {
						setFreshHome(!freshHome);
					}}
				>
					<Image
						className="logo rounded-4"
						src={logo}
					></Image>
				</Link>
				<Link
					className="fs-1"
					onClick={() => {
						setShow(!show);
						setFreshHome(!freshHome);
					}}
					to="/articles"
					key="link-all-articles"
				>
					All Topics
				</Link>
				{topics.map((thisTopic) => {
					return (
						<Link
							className="fs-1"
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
			</Navbar>
		</>
	);
}

export default NewsNav;
