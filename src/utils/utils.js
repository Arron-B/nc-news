export function capitaliseFirstLetter(str) {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function removeDeletedComment(comments, commentId) {
	return comments.filter((comment) => comment.comment_id !== commentId);
}
