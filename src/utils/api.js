import axios from "axios";

const API_BASE_URL = "http://localhost:7000/chat"; // Replace with your backend URL
 
// Helper function to handle API requests
const handleApiError = (error) => {
  console.error("API Error:", error.response || error.message);
  throw error.response ? error.response.data : error.message;
};

const api = {
  /**
   * Get all conversations for the logged-in user
   * @returns {Promise<Array>} Array of conversations
   */
  getConversations: async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/conversations`, email);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get messages for a specific conversation
   * @param {string} conversationId - ID of the conversation
   * @returns {Promise<Array>} Array of messages
   */
  getMessages: async (conversationId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversations/${conversationId}/messages`
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Send a new message
   * @param {Object} message - Message payload
   * @param {string} message.conversationId - ID of the conversation
   * @param {string} message.sender - Sender's email
   * @param {string} message.content - Message content
   * @returns {Promise<Object>} The created message
   */
  sendMessage: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, message);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Start a new conversation with a user
   * @param {string} recipientEmail - The email of the recipient
   * @returns {Promise<Object>} The created conversation
   */
  startConversation: async (recipientEmail) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/conversations`, {
        recipientEmail,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;
