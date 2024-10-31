import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import { UserProvider } from "./context/UserContext.js";
import AuctionDetail from "./pages/AuctionDetail";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import MyAuctions from "./pages/MyAuction.jsx";
import Payment from "./pages/Payment.jsx";
import Register from "./pages/Register.jsx";

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
            <Route path="/myAuctions" element={<MyAuctions />} />
            <Route path="/payment/:id" element={<Payment />} />
          </Routes>
        </Router>
      </SocketProvider>
    </UserProvider>
  );
};

export default App;
