import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../../providers/AuthProviders';

const PdfList = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                if (!email) return; // Ensure email exists before fetching

                const response = await axios.get(`http://localhost:7000/api/upload/files?email=${email}`);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [email]); // Run effect when email changes

    return (
        <div>
            <h2>My Uploaded Files</h2>
            {files.length > 0 ? (
                <ul>
                    {files.map((file) => (
                        <li key={file._id}>
                            <a href={`http://localhost:7000${file.path}`} target="_blank" rel="noopener noreferrer">
                                {file.originalname}
                            </a> - {new Date(file.uploadDate).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files uploaded yet.</p>
            )}
        </div>
    );
};

export default PdfList;
