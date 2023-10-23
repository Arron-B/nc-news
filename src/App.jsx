import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "./App.css";
import NewsNav from "./components/NewsNav";
import Home from "./components/Home";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<NewsNav />
			<Home />
		</>
	);
}

export default App;
