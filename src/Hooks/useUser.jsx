import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";

const useUser = () => {
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) {
      console.log("No user email found.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        console.log("Fetching data for:", user.email);
        const response = await axios.get(`http://localhost:7000/dbUser/${user.email}`);
        console.log("API Response:", response.data);
        setDbUser(response.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  useEffect(() => {
    console.log("Updated dbUser:", dbUser);
  }, [dbUser]);

  return { dbUser, loading, error };
};

export default useUser;
