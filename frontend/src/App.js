import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    // Example: Listen for an event from the server
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    // Example: Disconnect from the server
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    // Cleanup: Disconnect on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Auction System</h1>
      {/* Your application code here */}
    </div>
  );
};

export default App;
