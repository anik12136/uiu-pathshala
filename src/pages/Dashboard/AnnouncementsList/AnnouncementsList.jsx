import axios from "axios";
import React, { useEffect, useState } from "react";

const AnnouncementsList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); // Show first 3 initially
    const [expanded, setExpanded] = useState(false); // Toggle Show More/Less

    const API_URL = "https://server-uiu-pathshala.vercel.app/announcements"; // Backend API

    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get(API_URL);
            setAnnouncements(response.data); // Ensure backend sends sorted data (newest first)
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <div className="w-full p-3 rounded-lg shadow-lg">
            {/* Announcements Header */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
                📢 Recent Announcements
            </h3>

            {/* If No Announcements */}
            {announcements.length === 0 ? (
                <p className="text-gray-500 text-center text-base">No announcements yet.</p>
            ) : (
                <div className="space-y-6">
                    {/* Announcements List */}
                    {announcements.slice(0, expanded ? announcements.length : visibleCount).map((announcement) => (
                        <div
                            key={announcement._id}
                            className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition hover:shadow-lg"
                        >
                            {/* Date & Time */}
                            <p className="text-xs text-gray-500 font-light mb-2">
                                🕒 {new Date(announcement.updatedAt).toLocaleString()}
                            </p>

                            {/* Title */}
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{announcement.title}</h4>

                            {/* Description */}
                            <p className="text-sm text-gray-700">{announcement.description}</p>
                        </div>
                    ))}

                    {/* Show More / Show Less Button */}
                    {announcements.length > visibleCount && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md 
                hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
                            >
                                {expanded ? "Show Less" : "Show More"}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnnouncementsList;
