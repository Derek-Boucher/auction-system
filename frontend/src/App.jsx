import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import { UserProvider } from "./context/UserContext.js";
import AuctionDetail from "./pages/AuctionDetail";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/register.jsx";

const App = () => {
  return (
    <UserProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </SocketProvider>
    </UserProvider>
  );
};

export default App;
