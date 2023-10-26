import axios from "axios";

export const domainName = "https://api-news-tenc.onrender.com";

export function fetchAllTopics() {
	return axios.get(`${domainName}/api/topics`).then((res) => {
		return res;
	});
}

export function fetchAllArticles() {
	return axios.get(`${domainName}/api/articles`).then((res) => {
		return res;
	});
}

export function fetchArticlesByTopic(topic) {
	return axios.get(`${domainName}/api/articles?topic=${topic}`).then((res) => {
		return res;
	});
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

export function deleteComment(commentId) {
	return axios.delete(`${domainName}/api/comments/${commentId}`).then((res) => {
		return res;
	});
}
