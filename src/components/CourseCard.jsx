import React, { useContext } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProviders";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseCard = ({ course }) => {
  const { user } = useContext(AuthContext);

  const handleBookmark = async () => {
    const bookmarkData = {
      createBy: user.email,
      type: "course",
      courseId: course.id,
    };

    try {
      const response = await fetch(
        "http://localhost:7000/BookMark/addBookmark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmarkData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Bookmark added successfully!");
      } else {
        toast.info(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      toast.error("Error adding bookmark.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 relative">
      {/* Bookmark Icon */}
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 text-gray-800 text-xl"
        aria-label="Bookmark Course">
        <FaRegBookmark />
      </button>

      {/* Course Banner */}
      <img
        src={course.banner}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      {/* Course Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        <p className="text-sm font-medium text-gray-800">
          Instructor: <span className="text-blue-600">{course.instructor}</span>
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
          View Course
        </button>
      </div>

      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default CourseCard;
