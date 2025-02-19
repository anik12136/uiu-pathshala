import { useState } from "react";
import axios from "axios";

const VideoUploadModal = ({ courseId, chapterId, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert("Please fill in all fields and select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://server-uiu-pathshala.vercel.app/api/courses/${courseId}/chapters/${chapterId}/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.status === 201) {
        alert("Video uploaded successfully!");
        onClose(); // Close the modal
      } else {
        alert("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred while uploading the video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Video</h2>
        <input
          type="text"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          placeholder="Video Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="video/*"
          className="w-full mb-2"
          onChange={handleFileChange}
        />
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${
              isUploading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={isUploading ? null : handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadModal;
