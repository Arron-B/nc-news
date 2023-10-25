import { useState } from "react";
import "./App.css";
import NewsNav from "./components/NewsNav";
import Home from "./components/Home";
import Article from "./components/Article";
import Topic from "./components/Topic";
import UserLogin from "./components/UserLogin";
import { Routes, Route } from "react-router-dom";

function App() {
	const [user, setUser] = useState("");

	function handleLogin(selectedUser) {
		setUser(selectedUser);
	}

	return (
		<>
			<UserLogin handleLogin={handleLogin} />
			<NewsNav user={user} />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/articles/:article_id"
					element={<Article />}
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
