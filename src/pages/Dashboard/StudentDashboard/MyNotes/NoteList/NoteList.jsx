import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../../providers/AuthProviders';

const NoteList = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                if (!email) return;
                const response = await axios.get(`https://server-uiu-pathshala.vercel.app/api/upload/notes?email=${email}`);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [email]);

    // Handle deletion
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this file?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`https://server-uiu-pathshala.vercel.app/api/upload/${id}`);
            if (response.status === 200) {
                setFiles(files.filter((file) => file._id !== id)); // Update UI after deletion
                alert("File deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting file:", error);
            alert("Failed to delete file");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">📝 My Uploaded Notes</h2>

            {loading ? (
                <div className="flex justify-center items-center py-6">
                    <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-10 h-10"></div>
                </div>
            ) : files.length > 0 ? (
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
                    {files.map((file) => (
                        <div key={file._id} className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                                <span className="text-6xl text-gray-400">📄</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{file.filename || "Untitled Note"}</h3>
                                <p className="text-sm text-gray-500 mb-2">Uploaded: {new Date(file.uploadDate).toLocaleString()}</p>
                                <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className="block text-center px-4 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                    View Note
                                </a>
                                {/* Delete Button */}
                                <button 
                                    onClick={() => handleDelete(file._id)} 
                                    className="block w-full text-center px-4 py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No notes uploaded yet.</p>
            )}
        </div>
    );
};

export default NoteList;
