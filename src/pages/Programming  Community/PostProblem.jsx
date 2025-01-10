import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { fetchPosts } from "./hooks/usePosts";

const ProgrammingPost = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    code: "",
  });

  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
const { user } = useContext(AuthContext);
    const author = user?.email;
    
  const programmingLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags, code } = formData;

    if (!title || !description || !code) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:7000/CreateProgrammingPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            tags,
            language: selectedLanguage,
            code,
            author,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowModal(true); // Show modal on success
        setFormData({ title: "", description: "", tags: "", code: "" });
        setSelectedLanguage("javascript");
        

      
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        setTimeout(() => setErrorMessage(""), 3000); // Clear error after 3 seconds
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Unable to connect to the server. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000); // Clear error after 3 seconds
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Share Your <span className="text-red-600">Problem</span> with the
            Community
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Encountering a challenge? Let our community help you find the
            solution!
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded text-red-800">
            {errorMessage}
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Create New Problem
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Problem Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Reverse a Linked List"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Problem Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                placeholder="Describe your programming problem in detail..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., algorithms, data-structures (comma separated)"
              />
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Programming Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {programmingLanguages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Code Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code
              </label>
              <textarea
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px] font-mono bg-gray-900 text-gray-100"
                placeholder="Write or paste your code here..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Post Created
            </h2>
            <p className="mb-6 text-gray-600">
              Your programming problem has been successfully posted!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammingPost;
