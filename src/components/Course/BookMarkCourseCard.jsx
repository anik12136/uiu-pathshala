import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBook, FaVideo, FaTag, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCourses from "../../Hooks/useCourses";

const BookMarkCourseCard = ({ courseId, bookmarkId, onDelete }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { deleteBookmark } = useCourses(); // Hook for deleting bookmarks

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://server-uiu-pathshala.vercel.app/api/courses/${courseId}`
        );
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err.message);
        setError(err.message || "An error occurred while fetching the course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleDeleteBookmark = async () => {
    if (!bookmarkId) return;

    try {
      await deleteBookmark(bookmarkId);
      toast.success("Bookmark deleted successfully!");
      if (onDelete) onDelete(bookmarkId); // Remove from UI
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Failed to delete bookmark.");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading course...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!course)
    return <p className="text-center text-gray-600">Course not found.</p>;

  // Count chapters & videos
  const chapterCount = course.chapters ? course.chapters.length : 0;
  const videoCount = course.chapters
    ? course.chapters.reduce(
        (total, chapter) =>
          total + (chapter.videos ? chapter.videos.length : 0),
        0
      )
    : 0;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 border border-gray-200 relative">
      {/* Delete Button (Top Right) */}
      <button
        onClick={handleDeleteBookmark}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white p-2 rounded-full shadow-md transition-transform transform hover:scale-110">
        <FaTrash />
      </button>

      {/* Course Banner */}
      <img
        src={`https://server-uiu-pathshala.vercel.app/uploads/${course.bannerImage}`}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      {/* Course Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600">{course.description}</p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-gray-700 text-sm mt-4">
          <div className="flex items-center gap-1">
            <FaBook className="text-blue-500" />
            <span>{chapterCount} Chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <FaVideo className="text-red-500" />
            <span>{videoCount} Videos</span>
          </div>
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FaTag className="text-gray-500" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 flex justify-center">
        <Link
          to={`/course/${course._id}`}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center w-full text-lg font-medium">
          View Course
        </Link>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookMarkCourseCard;
