import { Button } from "react-bootstrap";

function LoginButton({ setShowAccounts }) {
	return (
		<Button
			className="login-btn"
			size="sm"
			onClick={() => {
				setShowAccounts(true);
			}}
		>
			Login
		</Button>
	);
}

export default LoginButton;
