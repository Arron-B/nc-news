import { Button } from "react-bootstrap";

function LoginButton({ setShowAccounts }) {
	return (
		<Button
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
