import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  Code2,
  Timer,
  AlertTriangle,
  Loader2,
  Play,
} from "lucide-react";
import { AuthContext } from "../../../providers/AuthProviders";

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

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [contestStatus, setContestStatus] = useState("upcoming"); // 'upcoming', 'ongoing', 'completed'
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/GetContest/${id}`
        );
        setContest(response.data[0]); // API returns array with single contest
        setLoading(false);
      } catch (error) {
        setError("Failed to load contest details");
        setLoading(false);
      }
    };
    fetchContest();
  }, [id]);

  useEffect(() => {
    if (!contest) return;

    const checkContestStatus = () => {
      const now = new Date();
      const startDate = new Date(`${contest.startDate}T${contest.startTime}`);
      const durationInHours = parseInt(contest.duration) || 2; // Default to 2 hours if duration is invalid
      const endDate = new Date(
        startDate.getTime() + durationInHours * 60 * 60 * 1000
      );

      if (now < startDate) {
        setContestStatus("upcoming");
        const timeToStart = startDate - now;
        setTimeLeft(timeToStart);
      } else if (now >= startDate && now < endDate) {
        setContestStatus("ongoing");
        const timeRemaining = endDate - now;
        setTimeLeft(timeRemaining);
      } else {
        setContestStatus("completed");
        setTimeLeft(0);
      }
    };

    checkContestStatus();

    const timer = setInterval(checkContestStatus, 1000);
    return () => clearInterval(timer);
  }, [contest]);

  const formatTimeLeft = (ms) => {
    if (!ms) return "00:00:00";
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleJoinContest = () => {
    setModalOpen(true); // Open the modal upon clicking join contest
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        {error || "Contest not found"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Banner Image */}
        <div className="h-64 relative">
          <img
            src={contest.banner || "/api/placeholder/800/400"}
            alt={contest.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contest Status Banner */}
        <div
          className={`p-4 text-white text-center font-semibold
          ${
            contestStatus === "upcoming"
              ? "bg-blue-600"
              : contestStatus === "ongoing"
              ? "bg-green-600"
              : "bg-gray-600"
          }`}>
          {contestStatus === "upcoming"
            ? "Starting in: "
            : contestStatus === "ongoing"
            ? "Time Remaining: "
            : "Contest Ended"}
          {contestStatus !== "completed" && (
            <span className="font-mono">{formatTimeLeft(timeLeft)}</span>
          )}
        </div>

        <div className="p-6">
          {/* Title and Difficulty */}
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {contest.title}
            </h1>
            <div
              className={`${
                difficultyConfig[contest.difficulty].color
              } px-4 py-2 rounded-full text-white font-medium inline-flex items-center gap-2`}>
              <span>{difficultyConfig[contest.difficulty].icon}</span>
              {difficultyConfig[contest.difficulty].text}
            </div>
          </div>

          {/* Contest Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Start Date
                </div>
                <div className="text-gray-800">
                  {new Date(contest.startDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Start Time
                </div>
                <div className="text-gray-800">
                  {formatAMPM(
                    new Date(`${contest.startDate}T${contest.startTime}`)
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <Timer className="h-5 w-5 text-amber-500" />
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Duration
                </div>
                <div className="text-gray-800">{contest.duration}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <Code2 className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Languages
                </div>
                <div className="flex gap-2">
                  {contest.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div
              className="prose prose-blue max-w-none bg-gray-50 p-4 rounded-lg"
              dangerouslySetInnerHTML={{ __html: contest.description }}
            />
          </div>

          {/* Join Button */}
          <div className="flex justify-center">
            <button
              className={`px-8 py-3 rounded-lg font-semibold text-white inline-flex items-center gap-2 transition-colors duration-200
                ${
                  contestStatus === "ongoing"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={contestStatus !== "ongoing"}
              onClick={handleJoinContest}>
              <Play className="h-5 w-5" />
              {contestStatus === "upcoming"
                ? "Contest Not Started"
                : contestStatus === "ongoing"
                ? "Join Contest"
                : "Contest Ended"}
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-gray-800">Success!</h2>
              <p className="text-gray-600 mt-2">
                You have successfully joined the contest: {contest.title}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetails;
