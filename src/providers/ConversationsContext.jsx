import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthProviders";
import { io } from 'socket.io-client';

export const ConversationsContext = createContext();

export const ConversationsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [conversations, setConversations] = useState([]);
  const [otherUsers, setOtherUsers] = useState({ online: [], offline: [] });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    // Emit user online event
    if (userEmail) {
      newSocket.emit('user-online', userEmail);
    }

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userEmail]);

  // Fetch conversations when userEmail exists
  useEffect(() => {
    const fetchConversations = async () => {
      if (userEmail) {
        try {
          const res = await axios.get(`http://localhost:7000/chat/conversations/${userEmail}`);
          setConversations(res.data);
        } catch (err) {
          console.error('Error fetching conversations', err);
        }
      }
    };

    fetchConversations();
  }, [userEmail]);

  // Extract the list of "other" users from conversations.
  useEffect(() => {
    if (!userEmail || !conversations.length) return;

    const usersMap = {};
    conversations.forEach((conv) => {
      // Find the participant that is not the current user
      conv.participants.forEach((participant) => {
        if (participant.email !== userEmail) {
          usersMap[participant.email] = { 
            email: participant.email, 
            name: participant.name,
            conversationId: conv._id
          };
        }
      });
    });

    const allUsers = Object.values(usersMap);
    // Separate online and offline, based on the onlineUsers list we get from socket
    const online = allUsers.filter((u) => onlineUsers.includes(u.email));
    const offline = allUsers.filter((u) => !onlineUsers.includes(u.email));

    setOtherUsers({ online, offline });
  }, [conversations, userEmail, onlineUsers]);

  // Listen for socket broadcast of online users (filter out the current user)
  useEffect(() => {
    if (!socket) return;
    
    socket.on('online-users', (users) => {
      setOnlineUsers(users.filter((email) => email !== userEmail));
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    // Cleanup when component unmounts or socket changes
    return () => socket.off('online-users');
  }, [socket, userEmail]);

  // Listen for socket for new messages and update the conversation accordingly
  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', (message) => {
      // Find the conversation and update the messages
      const newConversations = conversations.map((conv) => {
        if (conv._id === message.conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, message],
          };
        }
        return conv;
      });

      setConversations(newConversations);
    });

    return () => socket.off('new-message');
  }, [socket, conversations]);

  // Helper function to add a message optimistically
  const addMessage = (conversationId, message) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) => {
        if (conv._id === conversationId) {
          return { ...conv, messages: [...conv.messages, message] };
        }
        return conv;
      })
    );
  };


  // In ConversationsContext provider, before the return:
  const unreadCount = conversations.reduce((count, conv) => {
    const participant = conv.participants.find(p => p.email === userEmail);
    if (participant && participant.read === false) {
      return count + 1;
    }
    return count;
  }, 0);


  return (
    <ConversationsContext.Provider value={{ conversations, otherUsers, socket, addMessage, unreadCount  }}>
      {children}
    </ConversationsContext.Provider>
  );
};
