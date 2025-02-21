import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, PlusCircle } from "lucide-react";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Backend API base URL
    const API_URL = "http://localhost:7000/announcements";

    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get(API_URL);
            setAnnouncements(response.data); // Automatically sorted by newest first (from backend)
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Handle submit (Create / Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return alert("Title and Description are required!");

        try {
            if (editingId) {
                // Update announcement
                await axios.put(`${API_URL}/${editingId}`, { title, description });
            } else {
                // Create new announcement
                await axios.post(API_URL, { title, description });
            }

            // Reset form and refresh list
            setTitle("");
            setDescription("");
            setEditingId(null);
            fetchAnnouncements();
        } catch (error) {
            console.error("Error submitting announcement:", error);
        }
    };

    // Handle edit (populate form)
    const handleEdit = (announcement) => {
        setTitle(announcement.title);
        setDescription(announcement.description);
        setEditingId(announcement._id);
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this announcement?")) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchAnnouncements();
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Admin Announcements</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter announcement title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter announcement details"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    {editingId ? "Update Announcement" : "Post Announcement"}
                </button>
            </form>

            {/* Announcements List */}
            <div>
                <h3 className="text-xl font-semibold mb-3">All Announcements</h3>
                {announcements.length === 0 ? (
                    <p className="text-gray-500">No announcements yet.</p>
                ) : (
                    announcements.map((announcement) => (
                        <div key={announcement._id} className="p-4 mb-3 border rounded-lg shadow-sm">
                            <h4 className="text-lg font-semibold">{announcement.title}</h4>
                            <p className="text-gray-600">{announcement.description}</p>
                            <p className="text-sm text-gray-400">
                                Last updated: {new Date(announcement.updatedAt).toLocaleString()}
                            </p>
                            <div className="mt-2 flex gap-3">
                                <button
                                    onClick={() => handleEdit(announcement)}
                                    className="text-blue-500 hover:text-blue-700 flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-1" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(announcement._id)}
                                    className="text-red-500 hover:text-red-700 flex items-center"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Announcements;
