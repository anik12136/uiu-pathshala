import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  Code2,
  Trash2,
  ArrowRight,
  Timer,
  Loader2,
  Trophy,
  Users,
  Target,
} from "lucide-react";
import { AuthContext } from "../../../providers/AuthProviders";
import CreateContest from "./ContestPost";

// Difficulty configuration for styling and icons
const difficultyConfig = {
  easy: {
    color: "bg-emerald-500",
    icon: "🎯",
    text: "Beginner Friendly",
  },
  medium: {
    color: "bg-amber-500",
    icon: "🎲",
    text: "Intermediate",
  },
  hard: {
    color: "bg-rose-500",
    icon: "🏆",
    text: "Advanced",
  },
};

// Fetch contests from the backend
export const fetchContests = async () => {
  try {
    const response = await axios.get("http://localhost:7000/GetContest");
    return response.data;
  } catch (error) {
    console.error("Error fetching contests", error);
    return [];
  }
};

// Delete a contest by its ID
const deleteContest = async (id) => {
  try {
    await axios.delete(`http://localhost:7000/DeleteContest/${id}`);
  } catch (error) {
    console.error("Error deleting contest", error);
  }
};

const AllContest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // User context to check for author
  const navigate = useNavigate(); // Navigate hook for routing

  // Fetch contests when the component is mounted
  useEffect(() => {
    fetchContests()
      .then((data) => {
        setContests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Handle contest deletion with confirmation
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent propagation of click to the parent div
    if (window.confirm("Are you sure you want to delete this contest?")) {
      try {
        await deleteContest(id);
        setContests(contests.filter((contest) => contest._id !== id));

        // Fetch contests again to update the contest list
        fetchContests()
          .then((data) => {
            setContests(data); // Update the state with the new list
          })
          .catch((error) => {
            console.error("Error fetching contests:", error);
          });
      } catch (error) {
        console.error("Error deleting contest", error);
      }
    }
  };

  // Format date into a readable string
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show loading spinner while fetching contests
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <CreateContest setContests={setContests} />
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Explore All Programming Contests
      </h2>
      {contests.map(
        ({
          _id,
          title,
          description,
          banner,
          startDate,
          startTime,
          duration,
          languages,
          difficulty,
          author,
        }) => (
          <div
            key={_id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="h-96">
              <img
                src={
                  banner ||
                  "https://media.istockphoto.com/id/1137980342/vector/male-hand-holding-megaphone-with-contest-speech-bubble-loudspeaker-banner-for-business.jpg?s=2048x2048&w=is&k=20&c=eGwAfnwuOrOZBjGdzqzIcDRBjUwx_-e5fq1813d7ceU="
                }
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              {/* Title and Author */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{author}</span>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div
                className={`${difficultyConfig[difficulty].color} px-3 py-1 rounded-full text-white text-sm font-medium inline-flex items-center gap-1 mb-4`}>
                <span>{difficultyConfig[difficulty].icon}</span>
                {difficultyConfig[difficulty].text}
              </div>

              {/* Contest Details: Start Date, Time, Duration */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    Start Date: {formatDate(startDate)}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Start Time: {startTime}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <Timer className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Duration: {duration}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                  Language: <Code2 className="h-4 w-4 text-purple-500" />
                  <div className="flex flex-wrap gap-1">
                    {languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors duration-200"
                  onClick={() => navigate(`/contest-details/${_id}`)}>
                  <Target className="h-4 w-4" />
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Show Delete button only if the current user is the author of the contest */}
                {user?.email?.split("@")[0] === author && (
                  <button
                    onClick={(e) => handleDelete(_id, e)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors duration-200">
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AllContest;
