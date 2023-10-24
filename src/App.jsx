import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "./App.css";
import NewsNav from "./components/NewsNav";
import Home from "./components/Home";
import Article from "./components/Article";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<NewsNav />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/articles/:article_id"
					element={<Article />}
				/>
			</Routes>
		</>
	);
}

export default App;
