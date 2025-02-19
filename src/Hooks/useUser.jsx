import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";

const useUser = () => {
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get logged-in user from context

  useEffect(() => {
    if (!user?.email) {
      console.log("No user email found.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        console.log("Fetching user for email:", user.email);

        const response = await axios.get(
          `https://server-uiu-pathshala.vercel.app/dbUser/${user.email}`
        );

        console.log("API Response:", response.data);

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

    fetchUser();
  }, [user]); // Runs when the user changes

  return { dbUser, loading, error };
};

export default useUser;
