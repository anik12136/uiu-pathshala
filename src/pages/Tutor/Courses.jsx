import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewCourseCard from "../../components/NewCourseCard";
import NewCourseModal from "../../components/NewCourseModal";
import { FaSearch, FaPlus } from "react-icons/fa";

const Courses = () => {
  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: "",
    banner: "",
    description: "",
    tags: "",
    published: false,
  });

  const handleSaveCourse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/courses",
        newCourse
      );
      console.log(response.data);
      setCourses([...courses, response.data]); // Add the newly created course to the list
      setShowModal(false);
      setNewCourse({
        title: "",
        banner: "",
        description: "",
        tags: "",
        published: false,
      });
    } catch (err) {
      console.error("Error saving course:", err);
      setError("Failed to save the course. Please try again.");
    }
    setShowModal(false);
    setNewCourse({
      title: "",
      banner: "",
      description: "",
      tags: "",
      published: false,
    });
  };

  const handleEditCourse = (id) => {
    
    navigate(`edit-course/${id}`)
    console.log("Editing course:", id);
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

  

  // Fetch courses on page load
  useEffect(() => {
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

    fetchCourses();
  }, []);

  return (
    <div className="min-h-[calc(100vh-450px)] flex flex-col">
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
        onClose={() => setShowModal(false)}
        onSave={handleSaveCourse}
      />
    </div>
  );
};

export default Courses;
