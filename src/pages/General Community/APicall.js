import axios from "axios";

const API_URL = "http://localhost:7000";

// Fetch all posts from the backend
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/AllPost`);
        const filteredPosts = response.data.filter((item) => item.type === "post");
        const postsWithComments = {};
        const commentsWithReplies = {};

        for (const post of filteredPosts) {
            const postComments = response.data.filter(
                (item) => item.type === "comment" && item.postId.toString() === post._id.toString()
            );

            for (const comment of postComments) {
                const commentReplies = response.data.filter(
                    (item) => item.type === "reply" && item.commentId.toString() === comment._id.toString()
                );
                commentsWithReplies[comment._id] = commentReplies;
            }

            postsWithComments[post._id] = postComments;
        }

        return {
            posts: filteredPosts,
            comments: postsWithComments,
            replies: commentsWithReplies,
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

// Like a post
export const handleLikePost = async (postId, email) => {
    try {
        await axios.post(`${API_URL}/likePost/${postId}`, { email });
    } catch (error) {
        console.error("Error liking post:", error);
        throw error;
    }
};

// Delete a post
export const handleDeletePost = async (postId) => {
    try {
        await axios.delete(`${API_URL}/deletePost/${postId}`);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// Create a new post
export const handleNewPost = async (title, content, email) => {
    try {
        await axios.post(`${API_URL}/CreatePost`, {
            title,
            content,
            email,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Create a comment
export const handleComment = async (postId, content, email) => {
    try {
        await axios.post(`${API_URL}/CreateComment`, {
            postId,
            content,
            email,
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

// Create a reply
export const handleReply = async (commentId, content, email) => {
    try {
        await axios.post(`${API_URL}/CreateReply`, {
            commentId,
            content,
            email,
        });
    } catch (error) {
        console.error("Error creating reply:", error);
        throw error;
    }
};

// Like a comment
export const handleLikeComment = async (commentId, email) => {
    try {
        await axios.post(`${API_URL}/likeComment/${commentId}`, { email });
    } catch (error) {
        console.error("Error liking comment:", error);
        throw error;
    }
};

// Delete a comment
export const handleDeleteComment = async (commentId) => {
    try {
        await axios.delete(`${API_URL}/deleteComment/${commentId}`);
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

// Delete a reply
export const handleDeleteReply = async (replyId) => {
    try {
        await axios.delete(`${API_URL}/deleteReply/${replyId}`);
    } catch (error) {
        console.error("Error deleting reply:", error);
        throw error;
    }
};
