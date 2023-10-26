import { useState } from "react";
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
			/>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/articles/:article_id"
					element={<Article user={user} />}
				/>
				<Route
					path="/articles"
					element={<Topic />}
				/>
			</Routes>
		</>
	);
}

export default App;
