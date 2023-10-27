import { useState, useEffect } from "react";
import "./App.css";
import NewsNav from "./components/NewsNav";
import Home from "./components/Home";
import Article from "./components/Article";
import Topic from "./components/Topic";
import UserLogin from "./components/UserLogin";
import LoginButton from "./components/LoginButton";
import { Routes, Route } from "react-router-dom";

function App() {
	const [user, setUser] = useState("");
	const [showAccounts, setShowAccounts] = useState(false);
	const [freshHome, setFreshHome] = useState(false);

	useEffect(() => {
		window.localStorage.setItem("SelectedUser", JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		setUser(JSON.parse(window.localStorage.getItem("SelectedUser")));
	}, []);

	function handleLogin(selectedUser) {
		setUser(selectedUser);
	}

	return (
		<>
			<UserLogin
				handleLogin={handleLogin}
				user={user}
				showAccounts={showAccounts}
				setShowAccounts={setShowAccounts}
			/>
			<NewsNav
				user={user}
				LoginButton={LoginButton}
				setShowAccounts={setShowAccounts}
				setFreshHome={setFreshHome}
				freshHome={freshHome}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							freshHome={freshHome}
							setFreshHome={setFreshHome}
						/>
					}
				/>
				<Route
					path="/home"
					element={
						<Home
							freshHome={freshHome}
							setFreshHome={setFreshHome}
						/>
					}
				/>
				<Route
					path="/articles/:article_id"
					element={<Article user={user} />}
				/>
				<Route
					path="/articles"
					element={<Topic freshHome={freshHome} />}
				/>
			</Routes>
		</>
	);
}

export default App;
