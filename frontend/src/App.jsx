import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { UserProvider } from "./context/UserContext.js";
import AuctionDetail from "./pages/AuctionDetail"; // Assurez-vous que le chemin est correct
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

const App = () => {
  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    // Listen for an event from the server
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    // Disconnect from the server
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    // Cleanup: Disconnect on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/auction/:id" element={<AuctionDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
