export default function socketSetup(io) {
    // Connection event
    io.on('connection', (socket) => {
        console.log('A user connected'); // Log when a user connects

        // Listen for a custom event from the client to join an auction
        socket.on('joinAuction', (auctionId) => {
            // Join a specific room for the auction
            socket.join(auctionId);
            console.log(`User joined auction: ${auctionId}`); // Log which auction the user joined
            
            // Emit an event to all clients in the room
            io.to(auctionId).emit('message', `A new user has joined the auction: ${auctionId}`);
        });

        // Listen for an event for placing bids
        socket.on('placeBid', (bidData) => {
            // Logic to process the bid
            console.log(`Bid placed:`, bidData);
            
            // Emit the event to all clients in the auction room
            io.to(bidData.auctionId).emit('newBid', bidData);
        });

        // Disconnection event
        socket.on('disconnect', () => {
            console.log('User disconnected'); // Log when a user disconnects
        });
    });
}
