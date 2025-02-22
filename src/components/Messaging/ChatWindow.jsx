import { useContext, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
import { ConversationsContext } from "../../providers/ConversationsContext";
import axios from "axios";


const ChatWindow = ({ username, conversationId, currentUserEmail, socket }) => {
  // Derive the conversation directly from the context
  const { conversations, addMessage } = useContext(ConversationsContext);
  const conversation = conversations.find((conv) => conv._id === conversationId);
  // Directly use the messages from the conversation
  const messages = conversation?.messages || [];
  
  const [newMessage, setNewMessage] = useState("");

  // Determine recipient based on currentUserEmail
  const recipient = conversation?.participants.find((p) => p.email !== currentUserEmail);
  const recipientEmail = recipient?.email;


  const saveMessage = async (msg) => {
    try {
      const response = await axios.post(`http://localhost:7000/chat/message`, msg);
      console.log("Message saved:", response.data);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };


  useEffect(() => {
    // Scroll to bottom when messages change
    const chatDiv = document.getElementById("chat-messages");
    if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && socket && conversation) {
      const newMsg = {
        message: newMessage,
        timestamp: new Date(),
        senderEmail: currentUserEmail,
        senderName: username,
      };

      // Emit the message to the server
      socket.emit("send-message", {
        conversationId: conversation._id,
        recipient: recipientEmail, // Recipient's email
        content: newMessage,
        timestamp: new Date(),
        sender: currentUserEmail,
        senderName: username,
      });

      // Save the message to the context
      addMessage(conversation._id, newMsg);
      saveMessage({
        recipient: recipientEmail, 
        content: newMessage,
        timestamp: new Date(),
        sender: currentUserEmail,
      });
      // Save the message to the database
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-orange-200">
      <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.senderEmail === currentUserEmail
                ? "bg-blue-300 ml-auto text-white"
                : "bg-green-400 text-gray-800"
            }`}
          >
            {msg.message}
            <p className="text-xs text-gray-500 mt-1">
              {msg.senderEmail === currentUserEmail
                ? "(you) • "
                : msg.senderName + " • "}
              {formatTimestamp(msg.timestamp)}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-4 bg-orange-500">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-white text-black focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-3 bg-blue-500 rounded text-white hover:bg-blue-600"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
