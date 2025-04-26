import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProviders";
import BookMarkCourseCard from "../../../../components/Course/BookMarkCourseCard";

const DashboardCourses = () => {
  const [bookMarks, setBookMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) {
      console.log("No user email found.");
      setLoading(false);
      return;
    }

    const fetchBookmarkedCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/bookMarks/${user.email}`
        );
        setBookMarks(response.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedCourses();
  }, [user]);

  if (loading)
    return <p className="text-center text-lg">Loading bookmarks...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (bookMarks.length === 0)
    return <p className="text-center text-gray-600">No bookmarks found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      {bookMarks.map((bookmark) => (
        <BookMarkCourseCard
          key={bookmark._id}
          courseId={bookmark.courseId}
          bookmarkId={bookmark._id} 
          onDelete={(deletedId) =>
            setBookMarks(bookMarks.filter((b) => b._id !== deletedId))
          }
        />
      ))}
    </div>
  );
};

export default DashboardCourses;
