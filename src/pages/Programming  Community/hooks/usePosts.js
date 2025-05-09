import { useState, useEffect } from "react";
import axios from "axios";
import useNotifications from "../../../Hooks/useNotification";



// Fetch posts function
export const fetchPosts = async (setPosts, setError, setLoading) => {
    try {
        const response = await axios.get(
          "https://server-uiu-pathshala.vercel.app/GetProgrammingPost"
        );
        setPosts(response.data);
        setError(null);
    } catch (err) {
        setError("Error fetching posts");
        console.error("Error fetching posts:", err);
    } finally {
        setLoading(false);
    }
};

// Create post function

export const createPost = async (postData) => {
    try {
        const response = await axios.post(
          "https://server-uiu-pathshala.vercel.app/CreateProgrammingPost",
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Use the useNotifications hook to get refetchNotifications
        const { refetchNotifications } = useNotifications();
        await refetchNotifications(); // Refetch notifications after creating a post

        return response.data; // Return the response data for further handling
    } catch (err) {
        console.error("Error creating post:", err);
        throw err; // Rethrow the error for the caller to handle
    }
};

// Custom hook for posts
export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts(setPosts, setError, setLoading);
    }, []);

    const deletePost = async (postId) => {
        try {
            await axios.delete(
              `https://server-uiu-pathshala.vercel.app/DeleteProgrammingPost/${postId}`
            );
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    // Update post function
    const updatePost = async (postId, updatedData) => {
        try {
            const response = await axios.put(
              `https://server-uiu-pathshala.vercel.app/UpdateProgrammingPost/${postId}`,
              updatedData, // Pass the updatedData directly as the payload
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // After successful update, update the posts state with the new data
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, ...updatedData } : post
                )
            );

            return response.data; // Return the response data for further use
        } catch (err) {
            console.error("Error updating post:", err);
            throw err; // Rethrow the error to handle it in the calling function
        }
    };

    return { posts, loading, error, deletePost, updatePost, fetchPosts };
};
