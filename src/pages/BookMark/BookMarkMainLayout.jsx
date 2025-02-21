import React, { useState, useEffect, useContext } from "react";
import {
  Trash2,
  Clock,
  Calendar,
  User,
  Book,
  Trophy,
  Tag,
  Timer,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";


const BookMark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("course");
  const { user } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/BookMark/getAllBookMark/${user.email}`
      );

      setBookmarks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:7000/BookMark/deleteSingleBookMark/${id}`
      );
      fetchBookmarks();
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const getContestStatus = (startDate, startTime, duration) => {
    const contestStart = new Date(`${startDate} ${startTime}`);
    const durationParts = duration.split(":");
    const durationMs =
      (parseInt(durationParts[0]) * 60 * 60 + parseInt(durationParts[1]) * 60) *
      1000;
    const contestEnd = new Date(contestStart.getTime() + durationMs);
    const now = currentTime;

    if (now < contestStart) {
      return {
        status: "upcoming",
        timeLeft: contestStart - now,
        icon: <Timer className="w-4 h-4" />,
        label: "Starting in",
      };
    } else if (now >= contestStart && now <= contestEnd) {
      return {
        status: "ongoing",
        timeLeft: contestEnd - now,
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Time remaining",
      };
    } else {
      return {
        status: "ended",
        timeLeft: 0,
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Contest ended",
      };
    }
  };

  const formatTimeLeft = (ms) => {
    if (ms <= 0) return "0h 0m";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-emerald-100 text-emerald-800",
      Medium: "bg-amber-100 text-amber-800",
      Hard: "bg-rose-100 text-rose-800",
    };
    return colors[difficulty] || "bg-blue-100 text-blue-800";
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      ongoing: "bg-emerald-100 text-emerald-800",
      ended: "bg-gray-100 text-gray-600",
    };
    return colors[status];
  };

  const filteredBookmarks = bookmarks.filter(
    (bookmark) => bookmark.type === activeTab
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookmarks</h1>
        <p className="text-gray-600">Manage your saved courses and contests</p>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-center border-b mb-8">
        <button
          className={`px-6 py-3 mr-4 font-medium text-lg transition-all duration-200 ${activeTab === "course"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500 hover:text-blue-400"
            }`}
          onClick={() => setActiveTab("course")}>
          <div className="flex items-center">
            <Book className="mr-2" size={20} />
            Courses
          </div>
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg transition-all duration-200 ${activeTab === "contest"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500 hover:text-blue-400"
            }`}
          onClick={() => setActiveTab("contest")}>
          <div className="flex items-center">
            <Trophy className="mr-2" size={20} />
            Contests
          </div>
        </button>
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBookmarks?.map((bookmark) => (
          <div
            key={bookmark._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Course Card */}
            {bookmark.type === "course" && bookmark.CourseDetails && (
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {bookmark.CourseDetails.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1">
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">
                  {bookmark.CourseDetails.description?.slice(0, 150)}
                  {bookmark.CourseDetails.description?.length > 150
                    ? "..."
                    : ""}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <User size={16} className="mr-2" />
                    <span>Created by: {bookmark.CourseDetails.creator}</span>
                  </div>
                  {bookmark.CourseDetails.tags && (
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag size={16} className="text-gray-600" />
                      {typeof bookmark?.CourseDetails?.tags === "string" &&
                        bookmark.CourseDetails.tags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm">
                            {tag.trim()}
                          </span>
                        ))}

                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      Bookmarked on:{" "}
                      {new Date(bookmark.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Contest Card */}
            {bookmark.type === "contest" && bookmark.ContestDetails && (
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {bookmark.ContestDetails.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1">
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Status and Difficulty Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(() => {
                    const status = getContestStatus(
                      bookmark.ContestDetails.startDate,
                      bookmark.ContestDetails.startTime,
                      bookmark.ContestDetails.duration
                    );
                    return (
                      <div
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          status.status
                        )}`}>
                        {status.icon}
                        <span className="ml-1">
                          {status.status === "ended"
                            ? "Ended"
                            : `${status.label}: ${formatTimeLeft(
                              status.timeLeft
                            )}`}
                        </span>
                      </div>
                    );
                  })()}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                      bookmark.ContestDetails.difficulty
                    )}`}>
                    {bookmark.ContestDetails.difficulty}
                  </span>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {bookmark.ContestDetails.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Contest Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      Start Date:{" "}
                      {new Date(
                        bookmark.ContestDetails.startDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>
                      Start Time:{" "}
                      {new Date(
                        `1970-01-01T${bookmark.ContestDetails.startTime}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>Duration: {bookmark.ContestDetails.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User size={16} className="mr-2" />
                    <span>Author: {bookmark.ContestDetails.author}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      Bookmarked on:{" "}
                      {new Date(bookmark.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-gray-400 mb-4">
            {activeTab === "course" ? (
              <Book size={48} className="mx-auto" />
            ) : (
              <Trophy size={48} className="mx-auto" />
            )}
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No {activeTab}s bookmarked yet
          </h3>
          <p className="text-gray-600">
            Start exploring and bookmark your favorite {activeTab}s!
          </p>
        </div>
      )}
    </div>
  );
};

export default BookMark;
