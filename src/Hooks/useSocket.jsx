import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://server-uiu-pathshala.vercel.app"; // Adjust based on your backend URL

const useSocket = (email) => {
  useEffect(() => {
    if (!email) {
      console.error("Email is required for socket connection.");
      return;
    }

    // Establish connection with the email in the query string
    const socket = io(SOCKET_URL, {
      query: { email }, // Pass only email in the handshake query
    });

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    // Listen for the updated online users list
    socket.on("onlineUsers", (users) => {
      console.log("Online users:", users);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Cleanup on component unmount
    return () => socket.disconnect();
  }, [email]);
};

export default useSocket;
