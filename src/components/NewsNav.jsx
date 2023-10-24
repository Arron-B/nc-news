import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NewsNav() {
	return (
		<>
			<Navbar>
				<Link to="/">
					<Navbar.Brand>NC News</Navbar.Brand>
				</Link>
			</Navbar>
		</>
	);
}

export default NewsNav;
