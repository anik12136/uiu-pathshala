import { useState, useContext } from 'react';
import MessageList from '../../components/Messaging/MessageList';
import ChatWindow from '../../components/Messaging/ChatWindow';
import { AuthContext } from "../../providers/AuthProviders";
import { ConversationsContext } from '../../providers/ConversationsContext';
import './Messaging.css';

const Messaging = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;
  
  // Get conversations and the derived online/offline users from the ConversationsContext
  const { conversations, otherUsers, socket } = useContext(ConversationsContext);
  
  const [selectedConversation, setSelectedConversation] = useState(null);


  // Here we assume you want a list of conversation summaries.
  const conversationList = conversations.map(conv => {
    // Determine the "other" participant from this conversation.
    const otherParticipant = conv.participants.find(p => p.email !== currentUserEmail);
    return {
      id: conv._id,
      name: otherParticipant.name,
      email: otherParticipant.email,
      unseen: conv.participants.find(p => p.email === currentUserEmail)?.read === false,
      online: otherUsers.online.some(user => user.email === otherParticipant.email),
      messages: conv.messages,
    };
  });

  return (
    <div className="flex messaging">
      {/* Message List */}
      <MessageList
        conversations={conversationList}
        setSelectedConversation={setSelectedConversation}
      />

      {/* Chat Window */}
      {selectedConversation ? (
        <ChatWindow
          
          //find the user's username
          username={conversations[0]?.participants.find(p => p.email == currentUserEmail).name}          
          conversationId={selectedConversation}
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
