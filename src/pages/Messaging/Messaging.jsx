import { useState, useEffect, useContext } from 'react';
import MessageList from '../../components/Messaging/MessageList';
import ChatWindow from '../../components/Messaging/ChatWindow';
import AuthProviders from '../../providers/AuthProviders';
import './Messaging.css';

const Messaging = () => {


  const [selectedConversation, setSelectedConversation] = useState(null);
  const dummyConversations = [
    {
      id: 1,
      name: "Alice",
      unseen: true,
      online: true,
      messages: [
        {
          sender: "Alice",
          content: "Hi!",
          timestamp: "2025-01-25T09:00:00Z",
        },
        {
          sender: "user",
          content: "Hello!",
          timestamp: "2025-01-25T09:05:00Z",
        },
      ],
    },
    {
      id: 2,
      name: "Bob",
      unseen: false,
      online: false,
      messages: [
        {
          sender: "Bob",
          content: "Are you there?",
          timestamp: "2025-01-24T14:30:00Z",
        },
        {
          sender: "user",
          content: "Yes, what's up?",
          timestamp: "2025-01-24T14:35:00Z",
        },
      ],
    },
  ];


  
  return (
    <div className="flex messaging">
      {/* Message List */}
      <MessageList
        conversations={dummyConversations}
        setSelectedConversation={setSelectedConversation}
      />
      
      {/* Chat Window */}
      {selectedConversation ? (
        <ChatWindow conversation={selectedConversation} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-800 text-gray-400">
          Select a conversation to start chatting.
        </div>
      )}
    </div>
  );
};

export default Messaging;