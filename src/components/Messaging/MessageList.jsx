import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';

const MessageList = ({ conversations, setSelectedConversation }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-1/5 bg-orange-100 text-gray-400 hidden md:block">
      <h1 className="mx-3 my-3 px-4 py-2 font-extrabold text-white text-xl rounded-xl bg-orange-700">
        Messages
      </h1>
      <ul className="p-4 space-y-4">
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`flex items-center cursor-pointer p-2 rounded ${
              conversation.unseen ? "font-bold text-orange-600" : ""
            } hover:bg-gray-300`}
            onClick={() => setSelectedConversation(conversation)}
          >
            {conversation.name}
            {conversation.online && (
              <span className="w-3 h-3 ml-2 bg-green-500 rounded-full mr-2"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;