import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import SearchUserModal from './SearchUserModal';
import { FaPlus } from "react-icons/fa";


const MessageList = ({ conversations, setSelectedConversation }) => {
  const { user } = useContext(AuthContext);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <div className="w-1/5 bg-orange-100 text-gray-400 hidden md:block">
      <div className='flex items-start justify-between mx-3 my-3 px-4 py-2 bg-orange-700 rounded-xl'>
        <h1 className=" font-bold text-white text-l  ">
          Your Messages
        </h1>

        <button
          className="ml-2 bg-white text-[#ff6c26] p-2 rounded-full shadow-md hover:bg-gray-200"
          onClick={() => setShowSearchModal(true)}
        >
          <FaPlus />
        </button>
      </div>
      
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
      {showSearchModal && (
        <SearchUserModal
          senderEmail={user.email}
          closeModal={() => setShowSearchModal(false)}
          redirectRoute="/messaging"  // adjust the redirect route as needed
        />
      )}
    </div>
  );
};

export default MessageList;
