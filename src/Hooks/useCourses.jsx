import { useState, useEffect } from "react";
import axios from "axios";
import useNotifications from "./useNotification"; // Import for notifications

const API_BASE_URL = "http://localhost:7000/api/courses"; // Base API URL

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [SingleCourse, setSingleCourse] = useState(null); // State for single course
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refetchNotifications } = useNotifications(); // Get function to refetch notifications

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setCourses(response.data); // Update courses state
      } catch (err) {
        setError(err.message || "An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Runs once when component mounts

  // Fetch a single course by ID
  const getCourseById = async (courseId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${courseId}`);
      setSingleCourse(response.data); // Update single course state
    } catch (err) {
      setError(err.message || "An error occurred while fetching the course.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new course
  const addCourse = async (newCourseData) => {
    try {
      const response = await axios.post(API_BASE_URL, newCourseData);
      if (response.data.success) {
        console.log("Course added successfully!");
        await refetchNotifications(); // Refetch notifications after adding
      }
    } catch (err) {
      console.error("Error adding course:", err.message);
    }
  };

  return { courses, SingleCourse, loading, error, addCourse, getCourseById };
};

export default useCourses;
