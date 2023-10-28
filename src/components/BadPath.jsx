import { Image } from "react-bootstrap";

function BadPath() {
	return (
		<>
			<main className="h-75 d-flex flex-column align-items-center justify-content-center">
				<h1>You shall not path!...</h1>
				<h1>to this extension.</h1>
				<Image
					className="w-75"
					src="https://cdn.vox-cdn.com/thumbor/b2zu12nLBrVwxbLqFLKV1jUaMvU=/626x0:3657x1587/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23003314/4k_fellowship_movie_screencaps.com_23524.jpg"
				></Image>
				<h2>Sorry there's nothing here</h2>
			</main>
		</>
	);
}

export default BadPath;
