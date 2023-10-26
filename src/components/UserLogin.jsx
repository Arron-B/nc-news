import { Button, Modal, Card } from "react-bootstrap";
import { fetchAllUsers } from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function UserLogin({ handleLogin, user }) {
	const [show, setShow] = useState(user ? false : true);
	const [users, setUsers] = useState("");

	useEffect(() => {
		fetchAllUsers().then((res) => {
			setUsers(res.data.users);
		});
	}, []);

	if (show === true && users) {
		return (
			<Modal
				show={show}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Title>Select an account</Modal.Title>
				{users.map((user) => {
					return (
						<Card
							className="user-card"
							key={`select-${user.username}`}
						>
							<Card.Img
								className="avatar-img"
								size="sm"
								src={user.avatar_url}
							/>
							<Card.Body>{user.username}</Card.Body>
							<Button
								variant="primary"
								onClick={() => {
									handleLogin(user);
									setShow(false);
								}}
							>
								Sign in
							</Button>
						</Card>
					);
				})}
			</Modal>
		);
	} else if (show === true && !users) {
		return (
			<>
				<div className="await-accounts d-flex justify-content-center align-items-center">
					<Loading />;
				</div>
			</>
		);
	}
}

export default UserLogin;
