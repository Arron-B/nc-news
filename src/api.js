import axios from "axios";

export const domainName = "https://api-news-tenc.onrender.com";

export function fetchAllTopics() {
	return axios.get(`${domainName}/api/topics`).then((res) => {
		return res;
	});
}

export function fetchAllArticles(params) {
	const sort_by = params.sortBy;
	const { order } = params;

	if (params.topic) {
		const { topic } = params;
		return axios
			.get(
				`${domainName}/api/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`
			)
			.then((res) => {
				return res;
			});
	} else {
		return axios
			.get(`${domainName}/api/articles?sort_by=${sort_by}&order=${order}`)
			.then((res) => {
				return res;
			});
	}
}

export function fetchArticleById(id) {
	return axios.get(`${domainName}/api/articles/${id}`).then((res) => {
		return res;
	});
}

export function fetchCommentsByArticleId(id) {
	return axios.get(`${domainName}/api/articles/${id}/comments`).then((res) => {
		return res;
	});
}

export function voteOnArticle(articleId, vote) {
	return axios
		.patch(`${domainName}/api/articles/${articleId}`, {
			inc_votes: vote,
		})
		.then((res) => {
			return res;
		});
}

export function fetchAllUsers() {
	return axios.get(`${domainName}/api/users`).then((res) => {
		return res;
	});
}

export function postComment(articleId, username, body) {
	return axios
		.post(`${domainName}/api/articles/${articleId}/comments`, {
			username: username,
			body: body,
		})
		.then((res) => {
			return res;
		});
}
