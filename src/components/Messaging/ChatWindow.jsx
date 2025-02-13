import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatWindow = ({ conversation, currentUserEmail, socket }) => {
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for new messages
    if (socket) {
      socket.on('new-message', (message) => {
        if (message.sender === conversation.id) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }

    // Cleanup listener
    return () => {
      if (socket) {
        socket.off('new-message');
      }
    };
  }, [socket, conversation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    const chatDiv = document.getElementById("chat-messages");
    if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const newMsg = {
        sender: currentUserEmail,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      // Emit the message to the server
      socket.emit('send-message', {
        recipient: conversation.id, // Recipient's email
        content: newMessage,
        timestamp: new Date(),
        sender: currentUserEmail,
      });

      // Update local state
      setMessages((prev) => [...prev, newMsg]);
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
              msg.sender === currentUserEmail ? "bg-blue-300 ml-auto text-white" : "bg-green-400 text-gray-800"
            }`}
          >
            {msg.content}
            <p className="text-xs text-gray-500 mt-1">
              {msg.sender} • {formatTimestamp(msg.timestamp)}
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