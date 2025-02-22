import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../../providers/AuthProviders';

const PdfList = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                if (!email) return;
                const response = await axios.get(`http://localhost:7000/api/upload/files?email=${email}`);
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
            const response = await axios.delete(`http://localhost:7000/api/upload/${id}`);
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
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Uploaded Files</h2>
            {loading ? (
                <div className="flex justify-center items-center py-6">
                    <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8"></div>
                </div>
            ) : files.length > 0 ? (
                <div className="space-y-4">
                    {files.map((file) => (
                        <div key={file._id} className="p-4 border border-gray-200 shadow-sm rounded-xl flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="text-blue-500 text-xl">📄</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{file.filename || "Untitled File"}</p>
                                    <p className="text-xs text-gray-500">Uploaded: {new Date(file.uploadDate).toLocaleString()}</p>
                                </div>
                            </div>
                            <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
                                View File
                            </a>
                            {/* Delete Button */}
                            <button 
                                    onClick={() => handleDelete(file._id)} 
                                    className="block w-20 text-center px-4 py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No files uploaded yet.</p>
            )}
        </div>
    );
};

export default PdfList;
