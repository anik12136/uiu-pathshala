import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBook, FaVideo, FaTag } from "react-icons/fa";

const BookMarkCourseCard = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/courses/${courseId}`
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 border border-gray-200">
      {/* Course Banner */}
      <img
        src={`http://localhost:7000/uploads/${course.bannerImage}`}
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
    </div>
  );
};

export default BookMarkCourseCard;
