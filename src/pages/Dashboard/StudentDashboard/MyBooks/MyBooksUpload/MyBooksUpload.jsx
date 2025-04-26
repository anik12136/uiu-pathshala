import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../../providers/AuthProviders';

const MyBooksUpload = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email; // Get user email from AuthContext
    const pdf = "bookPdf";

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadedFileUrl, setUploadedFileUrl] = useState(''); // Store Cloudinary URL
    const [uploadProgress, setUploadProgress] = useState(0); // Store the progress of the upload

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
        formData.append('pdf', pdf);

        try {
            // Initiating file upload with progress tracking
            const response = await axios.post(
                'http://localhost:7000/api/upload',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted); // Update progress bar
                    }
                }
            );

            setMessage(response.data.message);

            if (response.data.file?.cloudinaryUrl) {
                setUploadedFileUrl(response.data.file.cloudinaryUrl); // Set Cloudinary URL
            }
        } catch (error) {
            setMessage('File upload failed');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Your PDF</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Choose a PDF file:</label>
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Upload
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center text-sm ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}

            {/* Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                    <p className="text-center text-sm text-gray-600">Uploading... {uploadProgress}%</p>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                        <div 
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {uploadedFileUrl && (
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Uploaded File: 
                        <a 
                            href={uploadedFileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                        >
                            View PDF
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}

export default MyBooksUpload;

