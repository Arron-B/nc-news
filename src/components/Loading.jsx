import { Container, Spinner } from "react-bootstrap";

function Loading() {
	return (
		<Container className="mx-auto my-auto w-100 d-flex flex-column align-items-center">
			<Spinner
				animation="border"
				role="status"
			>
				<span className="visually-hidden "></span>
			</Spinner>
			<p>Loading...</p>
		</Container>
	);
}

export default Loading;
