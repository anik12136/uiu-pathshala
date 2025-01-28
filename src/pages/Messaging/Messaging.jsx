import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import MessageList from '../../components/Messaging/MessageList';
import ChatWindow from '../../components/Messaging/ChatWindow';
import { AuthContext } from "../../providers/AuthProviders";
import './Messaging.css';

const Messaging = () => {
  const  {user}  = useContext(AuthContext);
  const currentUserEmail = user?.email;

  const [onlineUsers, setOnlineUsers] = useState([]); // List of online users
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io("http://localhost:8000"); // Replace with your backend URL
    setSocket(newSocket);

    // Emit user online event
    if (currentUserEmail) {
      
      newSocket.emit('user-online', currentUserEmail);
    }

    newSocket.on('connect', () => {
      console.log('Connected to server');
      console.log(currentUserEmail);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Listen for online users updates
    newSocket.on('online-users', (users) => {
      setOnlineUsers(users.filter((email) => email !== currentUserEmail));
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserEmail]);

  // Format online users into the required conversation structure
  const conversations = onlineUsers.map((email) => ({
    id: email, // Use email as the unique ID
    name: email, // Use email as the display name
    unseen: false, // No unread messages initially
    online: true, // All users in this list are online
    messages: [], // No messages initially
  }));

  return (
    <div className="flex messaging">
      {/* Message List */}
      <MessageList
        conversations={conversations}
        setSelectedConversation={setSelectedConversation}
      />

      {/* Chat Window */}
      {selectedConversation ? (
        <ChatWindow
          conversation={selectedConversation}
          currentUserEmail={currentUserEmail}
          socket={socket}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-800 text-gray-400">
          Select a conversation to start chatting.
        </div>
      )}
    </div>
  );
};

export default Messaging;