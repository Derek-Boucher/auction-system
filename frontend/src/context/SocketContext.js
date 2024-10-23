import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
