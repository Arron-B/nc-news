import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NewsNav() {
	return (
		<>
			<Navbar>
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
