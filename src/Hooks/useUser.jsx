import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";

const useUser = () => {
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get logged-in user from context

  // Fetch user data when the component is mounted or user changes
  const fetchUser = async () => {
    if (!user?.email) {
      console.log("No user email found.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching user for email:", user.email);

      // API call to fetch user data by email
      const response = await axios.get(
        `http://localhost:7000/dbUser/${user.email}`
      );

      console.log("API Response:", response.data);

      // Check if the user data was found
      if (response.data) {
        setDbUser(response.data); // Set fetched user data
      } else {
        setError("User not found in database.");
      }
    } catch (err) {
      console.error("Error fetching user:", err.message);
      setError(err.message || "An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]); // Runs whenever the user object changes

  // Function to update user profile
  const updateUserProfile = async (updatedUser) => {
    try {
      const response = await axios.patch(
        "http://localhost:7000/dbUser/users", // API endpoint to update user profile
        updatedUser
      );

      if (response.data.success) {
        fetchUser(); // Re-fetch user data after update
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error("Error updating user:", err);
      return {
        success: false,
        message:
          err.message || "An error occurred while updating your profile.",
      };
    }
  };

  return { dbUser, loading, error, updateUserProfile };
};

export default useUser;
