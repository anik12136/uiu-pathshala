import { useState } from "react";
import axios from "axios";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/GetProgrammingComments/${postId}`
      );
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  const handleAddComment = async ({ author, text }) => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:7000/CreateProgrammingComment",
        { postId, author, text }
      );

      setComments((prevComments) => [...prevComments, response.data.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleVote = async (commentId, type, author) => {
  console.log(commentId);
  try {
    console.log("Voting for commentId:", commentId); // Log commentId to ensure correctness

    const response = await axios.put(
      `http://localhost:7000/VoteProgrammingComment/${commentId}`,
      { type, author }
    );

    if (response.status === 200) {
      const updatedComment = response.data.comment;

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
    }
  } catch (err) {
    console.error("Error voting on comment", err);
    if (err.response) {
      console.error("Error details:", err.response.data);
    }
  }
};



  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:7000/DeleteProgrammingComment/${commentId}`
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  const updateComment = async (commentId, text) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/UpdateProgrammingComment/${commentId}`,
        { text }
      );

      // setComments((prevComments) =>
      //   prevComments.map((comment) =>
      //     comment._id === commentId
      //       ? { ...comment, text: response.data.text }
      //       : comment
      //   )
      // );
    } catch (err) {
      console.error("Error updating comment", err);
    }
  };

  return {
    comments,
    newComment,
    setNewComment,
    fetchComments,
    handleAddComment,
    handleVote,
    deleteComment,
    updateComment,
  };
};
