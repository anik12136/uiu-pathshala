import React, { useState, useEffect, useContext } from "react";
import { Trash2, Clock, Calendar, User, Trophy, Timer, CheckCircle, AlertCircle } from "lucide-react";
import { AuthContext } from "../../../../providers/AuthProviders";
import axios from "axios";

const MyContest = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchContests = async () => {
        try {
            const response = await axios.get(
                `https://server-uiu-pathshala.vercel.app/BookMark/getAllBookMark/${user.email}`
            );
            setContests(response.data.filter(bookmark => bookmark.type === "contest"));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching contests:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContests();
    }, [user.email]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://server-uiu-pathshala.vercel.app/BookMark/deleteSingleBookMark/${id}`);
            fetchContests();
        } catch (error) {
            console.error("Error deleting contest bookmark:", error);
        }
    };

    const getContestStatus = (startDate, startTime, duration) => {
        const contestStart = new Date(`${startDate} ${startTime}`);
        const durationParts = duration.split(":");
        const durationMs = (parseInt(durationParts[0]) * 60 * 60 + parseInt(durationParts[1]) * 60) * 1000;
        const contestEnd = new Date(contestStart.getTime() + durationMs);
        const now = currentTime;

        if (now < contestStart) {
            return { status: "upcoming", timeLeft: contestStart - now, icon: <Timer className="w-4 h-4" />, label: "Starting in" };
        } else if (now >= contestStart && now <= contestEnd) {
            return { status: "ongoing", timeLeft: contestEnd - now, icon: <AlertCircle className="w-4 h-4" />, label: "Time remaining" };
        } else {
            return { status: "ended", timeLeft: 0, icon: <CheckCircle className="w-4 h-4" />, label: "Contest ended" };
        }
    };

    const formatTimeLeft = (ms) => {
        if (ms <= 0) return "0h 0m";
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading your contests...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Contest</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contests.map((bookmark) => (
                    <div key={bookmark._id} className=" rounded-md bg-white shadow-lg">
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
                                                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium `}>
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
                                        className={`px-3 py-1 rounded-full text-sm font-medium `}>
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

            {contests.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Trophy size={48} className="mx-auto text-gray-400" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No contests bookmarked yet</h3>
                    <p className="text-gray-600">Start exploring and bookmark your favorite contests!</p>
                </div>
            )}
        </div>
    );
};

export default MyContest;
