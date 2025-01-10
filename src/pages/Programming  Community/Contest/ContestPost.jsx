import React, { useState, useContext } from "react";
import { Calendar, Clock, Code2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../../providers/AuthProviders";
import axios from "axios";
import { fetchContests } from "./AllContest";

// Quill configuration for text editor
const descriptionModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const CreateContest = ({ setContests }) => {
  // Accept setContests function as a prop
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    duration: "",
    languages: [],
    difficulty: "medium",
    banner: "",
    author: "",
  });

  const [showModal, setShowModal] = useState(false);

  const difficultyOptions = ["easy", "medium", "hard"];
  const languageOptions = ["Python", "JavaScript", "Java", "C++", "Ruby", "Go"];

  const { user } = useContext(AuthContext);
  const author = user?.email?.split("@")[0]; // Capture user email prefix as author

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleLanguageChange = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((lang) => lang !== language)
        : [...prev.languages, language],
    }));
  };

  // After contest is successfully created, refetch the contests and update the state in AllContest
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData, author };
      const response = await axios.post(
        "http://localhost:7000/createContest",
        finalData
      );

      if (response.status === 201) {
        setShowModal(true);
        setFormData({
          title: "",
          description: "",
          startDate: "",
          startTime: "",
          duration: "",
          languages: [],
          difficulty: "medium",
          banner: "",
          author: "",
        });

        // Fetch contests again to update the contest list
        fetchContests()
          .then((data) => {
            setContests(data); // Update the state with the new list
          })
          .catch((error) => {
            console.error("Error fetching contests:", error);
          });
      }
    } catch (error) {
      console.error("Error creating contest:", error);
      alert("Failed to create contest. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Create a New Programming Contest
        </h1>
        <p className="text-gray-500 mt-2">
          Showcase your skills and challenge the coding community!
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
            placeholder="Enter contest title"
          />
        </div>

        {/* Banner URL */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Banner Image URL
          </label>
          <input
            type="text"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter the URL of the banner image"
          />
          {formData.banner && (
            <div className="mt-2">
              <img
                src={formData.banner}
                alt="Banner Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={descriptionModules}
            placeholder="Enter contest description"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Duration <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 2 hours"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Languages Selection */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Languages <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {languageOptions.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 rounded-full ${
                  formData.languages.includes(lang)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}>
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Difficulty <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            {difficultyOptions.map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={formData.difficulty === level}
                  onChange={handleChange}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Create Contest
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-lg font-semibold">
              Contest Created Successfully!
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContest;
