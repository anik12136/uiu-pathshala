import { useState, useEffect } from "react";
import axios from "axios";
import useNotifications from "./useNotification"; // Import useNotifications to trigger notifications update

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refetchNotifications } = useNotifications(); // Get the function to trigger notifications fetching

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:7000/courses");
        setCourses(response.data); // Update the courses state with fetched data
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCourses();
  }, []); // Fetch courses on component mount

  const addCourse = async (newCourseData) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/courses",
        newCourseData
      );
      if (response.data.success) {
        // After successfully adding a course, refetch notifications
        console.log("Course added successfully!");
        await refetchNotifications(); // Ensure notifications are refetched
      }
    } catch (err) {
      console.error("Error adding course:", err.message);
    }
  };

  return { courses, loading, error, addCourse };
};

export default useCourses;
