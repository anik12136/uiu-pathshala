import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaBook, FaVideo, FaTag } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProviders";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseCard = ({ course }) => {
  const { user } = useContext(AuthContext);

  const handleBookmark = async () => {
    const bookmarkData = {
      createBy: user.email,
      type: "course",
      courseId: course._id,
    };

    try {
      const response = await fetch(
        "https://server-uiu-pathshala.vercel.app/BookMark/addBookmark",
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
      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-all duration-300"
        aria-label="Bookmark Course">
        <FaRegBookmark className="text-xl" />
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
      <div className="p-4 border-t bg-gray-50">
        <Link
          to={`/course/${course._id}`}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full text-center block">
          View Course
        </Link>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default CourseCard;
