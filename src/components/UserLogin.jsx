import { Button, Modal, Card } from "react-bootstrap";
import { fetchAllUsers } from "../api.js";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function UserLogin({ handleLogin, showAccounts, setShowAccounts, user }) {
	const [users, setUsers] = useState("");

	useEffect(() => {
		fetchAllUsers().then((res) => {
			setUsers(res.data.users);
		});
	}, []);

	if (showAccounts === true && users) {
		return (
			<Modal
				show={showAccounts}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Title>Select an account</Modal.Title>
				{users.map((user) => {
					return (
						<Card
							className="user-card p-1 m-1"
							key={`select-${user.username}`}
						>
							<Card.Img
								className="avatar-img"
								size="sm"
								src={user.avatar_url}
							/>
							<Card.Body className="text-center">{user.username}</Card.Body>
							<Button
								variant="primary"
								onClick={() => {
									handleLogin(user);
									setShowAccounts(false);
								}}
							>
								Sign in
							</Button>
						</Card>
					);
				})}
			</Modal>
		);
	} else if (showAccounts === true && !users) {
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
