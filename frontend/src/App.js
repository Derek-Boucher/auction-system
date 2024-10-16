import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Auction System</h1>
    </div>
  );
}

export default App;
