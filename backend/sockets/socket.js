let viewersCount = 0;

// Function to set up WebSocket connections
const socketSetup = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected"); // Log when a new client connects

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected"); // Log when a client disconnects
    });

    socket.on("joinAuction", (auctionId) => {
      viewersCount++; // Increment viewers count
      io.emit("viewersCountUpdate", viewersCount); // Emit the updated count
    });

    socket.on("leaveAuction", (auctionId) => {
      viewersCount = Math.max(viewersCount - 1, 0); // Decrement and ensure count is non-negative
      io.emit("viewersCountUpdate", viewersCount); // Emit the updated count
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
