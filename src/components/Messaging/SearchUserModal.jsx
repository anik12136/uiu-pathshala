import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { ConversationsContext } from "../../providers/ConversationsContext";

const SearchUserModal = ({ senderEmail, closeModal, redirectRoute }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { refreshConversations } = useContext(ConversationsContext);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      // Make a GET call with the query as a route parameter.
      // Adjust the API endpoint as needed.
      const res = await axios.get(`http://localhost:7000/chat/user/${query}`);
      setResults(res.data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConversation = async (recipientEmail) => {
    const payload = {
      recipient: recipientEmail,
      content: "Hi!",
      timestamp: new Date().toISOString(),
      sender: senderEmail,
    };

    try {
      // Make the POST request to create a conversation.
      // Adjust the endpoint as needed.
      const res = await axios.post("http://localhost:7000/chat/message", payload)
      .then((res) => {
        console.log("Conversation created:", res.data);
        refreshConversations(); // Refresh the conversations list
        
        navigate(redirectRoute);
        closeModal(); // Close the modal
      })
      
      // On successful response, redirect the user.
      
    } catch (error) {
      console.error("Error creating conversation:", error);
      // Optionally display an error message.
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-4 relative">
        {/* Close Button */}
        <button 
          onClick={closeModal} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={18} />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Search for a Recipient</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter name, email, or student ID"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        <div>
          {results.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            <ul className="space-y-3">
              {results.map((user) => (
                <li key={user._id} className="flex items-center justify-between border p-2 rounded">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.studentID && (
                      <p className="text-sm text-gray-600">ID: {user.studentID}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCreateConversation(user.email)}
                    className="text-orange-500 hover:text-orange-700"
                    title="Start Conversation"
                  >
                    <FaPaperPlane size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUserModal;
