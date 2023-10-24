import axios from "axios";

const domainName = "https://api-news-tenc.onrender.com";

export function fetchAllTopics() {
	return axios.get(`${domainName}/api/topics`).then((res) => {
		return res;
	});
}

export function fetchArticlesByTopic(topic) {
	return axios.get(`${domainName}/api/articles?topic=${topic}`).then((res) => {
		return res;
	});
}
