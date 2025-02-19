import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../../providers/AuthProviders';

const MyPdfUpload = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email; // Get user email from AuthContext
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file');
            return;
        }
        if (!email) {
            setMessage('User email is required');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);
        formData.append('pdf');

        try {
            const response = await axios.post('http://localhost:7000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('File upload failed');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>File Upload</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default MyPdfUpload;
