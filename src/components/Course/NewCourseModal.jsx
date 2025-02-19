import { useState } from "react";
import axios from "axios";


const NewCourseModal = ({ isOpen, onClose, creator }) => {
  const [title, setTitle] = useState("");
  const [bannerPreview, setBannerPreview] = useState(null); // For previewing the image
  const [bannerFile, setBannerFile] = useState(null); // For sending to the backend
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const email = creator;

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file)); // Preview the selected image
      setBannerFile(file); // Save the file for upload
    }
  };

  const resetForm = () => {
    setTitle("");
    setBannerPreview(null);
    setBannerFile(null);
    setDescription("");
    setTags([]);
  };

  const handleSave = async () => {
    if (!title || !bannerFile) {
      setError("Title and banner image are required.");
      return;
    }
    setError(""); // Clear error
    const formData = new FormData();
    formData.append("creator", email);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags); // Convert tags array to JSON string
    formData.append("bannerImage", bannerFile); // Attach the banner file
    try {
      console.log("Form Data:", formData); 
      
      // Use Axios to send the FormData
      const response = await axios.post("https://server-uiu-pathshala.vercel.app/api/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }).then((res) => { 
        console.log("Course created successfully:", res.data);

        resetForm(); // Clear the form after successful submission
        onClose(); // Close the modal
      });

      
    } catch (error) {
      console.error("Error creating course:", error.message);
      setError("Failed to save the course. Please try again.");
    }
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Course</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6c26]"
            />
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff6c26] file:text-white hover:file:bg-orange-600"
            />
            {bannerFile && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-4 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6c26]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., JavaScript, React"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6c26]"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#ff6c26] text-white rounded-lg hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCourseModal;
