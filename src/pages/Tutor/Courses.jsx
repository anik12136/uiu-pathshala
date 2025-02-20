import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewCourseCard from "../../components/Course/NewCourseCard";
import NewCourseModal from "../../components/Course/NewCourseModal";
import { FaSearch, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders"; // Import the AuthContext

const Courses = () => {
  const navigate = useNavigate();
  const userContext = useContext(AuthContext); // Get the user object from the AuthContext

  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onModalClose = () => {
    setShowModal(false);
    fetchCourses(); // Fetch courses after closing the modal
  };

  const handleEditCourse = (id) => {
    navigate(`edit-course/${id}`); // Navigate to the edit course page
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id)); // Assuming `_id` is the unique identifier
    } catch (err) {
      console.error("Error deleting course:", err);
      setError("Failed to delete the course. Please try again.");
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/courses");
      setCourses(response.data); // Assuming API returns an array of courses
      setLoading(false);
      
    } catch (err) {
      setError("Failed to fetch courses. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch courses on page load
  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-450px)]">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-8 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-450px)] flex ">
      <div className="max-w-6xl mx-auto p-6 flex-grow">
        {/* Search Bar */}
        <div className="flex items-center mb-6 bg-[#ff6c26] p-2 rounded-lg shadow-md">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-12 py-2 bg-transparent text-white placeholder-white border-none focus:outline-none"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-2 bg-white text-[#ff6c26] p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <FaPlus />
          </button>
        </div>

        {/* Course List */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {courses &&
            courses.map((course) => (
              <NewCourseCard
                key={course._id}
                course={course}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            ))}
        </div>
      </div>

      {/* New Course Modal */}
      <NewCourseModal
        isOpen={showModal}
        onClose={onModalClose}
        creator={userContext.user.email} // Pass the user object email to the modal
      />
    </div>
  );
};

export default Courses;
