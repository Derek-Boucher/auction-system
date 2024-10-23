// Function to set up WebSocket connections
const socketSetup = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected"); // Log when a new client connects

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected"); // Log when a client disconnects
    });

    // Listen for bid placement events
    socket.on("placeBid", (auctionId, bidAmount) => {
      // Create an object to represent the updated auction details
      const updatedAuction = {
        _id: auctionId,
        currentBid: bidAmount,
      };

      // Emit the updated auction details to all connected clients
      io.emit("bidUpdate", updatedAuction);
    });
  });
};

export default socketSetup;
