import { useState, useEffect } from "react";
import axios from "axios";

const useAllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:7000/allUsers");
        setAllUsers(response.data); // Update the allUser state with fetched data
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCourses();
  }, []);

  return { allUsers, loading, error };
};

export default useAllUser;
