import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";
import { useContext } from "react";

const useUser = () => {
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const { user } = useContext(AuthContext);
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/dbUser/${user.email}`);
        setDbUser(response.data); // Update the users state with fetched data
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchUsers();
  }, []);

  return { dbUser, loading, error };
};

export default useUser;
