import { useState } from "react";
import EditModal from "./EditModal"; // Assuming EditModal is reusable for editing fields
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import "./BannerTitle.css";

const BannerTitleDescription = ({ course, onSaveField }) => {
  const [editingField, setEditingField] = useState(null);
  const [initialValue, setInitialValue] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [newStatus, setNewStatus] = useState(course.status);


  const handleEdit = (field) => {
    setEditingField(field);
    setInitialValue(course[field] || ""); // Set initial value to current field value
  };

  const handleSave = (value) => {
    if (onSaveField && typeof onSaveField === "function") {
      onSaveField("course", { courseId: course._id }, editingField, value); // Pass required arguments
      setEditingField(null); // Close the modal
    } else {
      console.error("onSaveField is not a function");
    }
  };

  const updateCourse = () => {
    
    setEditingField(null);
  };


  // Helper function to render stars for the rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>{i <= rating ? "★" : "☆"}</span>);
    }
    return <div className="text-yellow-500 text-lg">{stars}</div>;
  };

  // Function to handle the switch click event.
  const handleSwitchClick = (e) => {
    // Prevent the default toggle behavior since we need confirmation first.
    e.preventDefault();
    // Calculate the new status (toggle the status).
    const toggledStatus = course.status === "public" ? "private" : "public";
    setNewStatus(toggledStatus);
    // Show the confirmation modal.
    setShowConfirm(true);
  };

  // Function to handle canceling the action.
  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Function to handle confirming the action.
  const handleConfirm = async () => {
    console.log(course._id);
    try {
      // Call your API endpoint, for example using fetch.
    
      const response = await axios.put(`https://server-uiu-pathshala.vercel.app/api/courses/${course._id}/status`, {
        "status": newStatus,
      });

      if (!response.status === 200) {
        throw new Error("Failed to update course status");
      }
      // On success, refresh the page.
      window.location.reload();
    } catch (error) {
      console.error("Error updating course status:", error);
      alert("Failed to update course status. Please try again.");
    }
  };



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mb-8">
        <img
          src={
            course.bannerImage
              ? `https://server-uiu-pathshala.vercel.app/uploads/${course.bannerImage}`
              : "https://placehold.co/800x400"
          }
          alt={course.title || "Untitled Course"}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          {/* Title Section */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">
              {course.title || "Untitled Course"}
            </h1>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700 relative group w-6 h-6"
              onClick={() => handleEdit("title")}
            >
              <FaEdit className="text-blue-500 text-lg" />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                Edit Title
              </span>
            </button>
          </div>

          {/* Rating Section */}
          <div className="mt-2 flex items-center">
            {renderRatingStars(course.rating || 0)}
          </div>


          {/* Tags Section */}
          {course.tags && (
            <div className="mt-2 flex flex-wrap gap-2">
              {course.tags
                .map((tag) => tag.trim())
                .filter((tag) => tag) // Ensure no empty tags are rendered
                .map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full border border-blue-300"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}


          
          {/* Description Section */}
          <div className="mt-4 flex items-center">
            <p className="text-gray-700">
              {course.description || "No description provided."}
            </p>
            <button
              className="ml-2 text-gray-500 hover:text-gray-700 relative group w-6 h-6"
              onClick={() => handleEdit("description")}
            >
              <FaEdit className="text-blue-500 text-lg" />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                Edit Description
              </span>
            </button>
          </div>

          {/* status section */}
          <div className="mt-4 flex items-center ">
            {
              course.status === "private" ? <div className="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-full border  border-red-800 mr-3">
              {course.status}
            </div> : <div className="px-3 py-2 bg-blue-300 text-green text-sm font-medium rounded-full border  border-blue-800 mr-3">
              {course.status}
            </div>
            }
            
            
            <label className="switch">
              <input
                type="checkbox"
                checked={course.status === "public"}
                // Remove disabled/readOnly so user can click, then intercept via onClick.
                onClick={handleSwitchClick}
                readOnly
              />
              <span className="slider round"></span>
            </label>
          </div>
          
        </div>
      </div>

      {/* Edit Modal */}
      {editingField && (
        <EditModal
          field={editingField}
          initialValue={initialValue}
          onSave={handleSave}
          onClose={updateCourse}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Do you want to change the status of this course?</p>
            <div className="modal-buttons">
              <button onClick={handleCancel} className="bg-orange-400 text-white text-sm font-medium rounded-full border">Cancel</button>
              <button onClick={handleConfirm} className="bg-red-800 text-white text-sm font-medium rounded-full border">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerTitleDescription;
