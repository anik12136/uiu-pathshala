import { useState, useEffect } from "react";
import axios from "axios";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("../../public/fakeDB/courses.json");
        setCourses(response.data); // Update the courses state with fetched data
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;
