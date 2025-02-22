import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';

const MessageList = ({ conversations, setSelectedConversation, username }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-1/5 bg-orange-100 text-gray-400 hidden md:block">
      <h1 className="mx-3 my-3 px-4 py-2 font-bold text-white text-l rounded-xl bg-orange-700">
        Your Messages {username}
      </h1>
      <ul className="p-4 space-y-4">
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`flex items-center cursor-pointer p-2 rounded ${
              conversation.unseen ? "font-bold text-orange-600" : ""
            } hover:bg-gray-300`}
            onClick={() => setSelectedConversation(conversation.id)}
          >
            <span className={`w-3 h-3 mr-2 rounded-full ${conversation.online ? "bg-green-500" : ""}`}></span>
            <div className="flex flex-col flex-grow">
              <span>{conversation.name}</span>
              <span className="text-xs text-gray-600">{conversation.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
