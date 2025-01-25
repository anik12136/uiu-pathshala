import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatWindow = ({ conversation }) => {
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [newMessage, setNewMessage] = useState("");


  // Fetch messages when a conversation is selected
  // useEffect(() => {
  //   if (!conversation) return;

  //   const fetchMessages = async () => {
  //     try {
  //       const data = await api.getMessages(conversation._id); // Fetch messages from backend
  //       setMessages(data);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  //   fetchMessages();
  // }, [conversation]);


  useEffect(() => {
    // Update messages when the conversation changes
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    const chatDiv = document.getElementById("chat-messages");
    if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        sender: "user",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };


  return (
    <div className="flex-1 flex flex-col bg-orange-200">
      <div
        id="chat-messages"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender === "user" ? "bg-blue-300 ml-auto" : "bg-green-400"
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