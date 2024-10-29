// server.js
const viewersByAuction = {}; // Object to keep track of viewers per auction

const socketSetup = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");

      // Iterate through all auctions and remove the socket from each auction's viewer list
      for (const auctionId in viewersByAuction) {
        if (viewersByAuction[auctionId].has(socket.id)) {
          viewersByAuction[auctionId].delete(socket.id); // Remove the viewer
          // Broadcast the updated count to all clients in this auction
          io.to(auctionId).emit(
            "viewersCountUpdate",
            viewersByAuction[auctionId].size
          );

          // Clean up if no viewers are left for this auction
          if (viewersByAuction[auctionId].size === 0) {
            delete viewersByAuction[auctionId];
          }
        }
      }
    });

    socket.on("joinAuction", (auctionId) => {
      socket.join(auctionId); // Join the room for this specific auction

      // Initialize viewers count for this auction if not already done
      if (!viewersByAuction[auctionId]) {
        viewersByAuction[auctionId] = new Set(); // Use a Set to track unique viewers
      }

      // Add the socket id to the viewers for this auction
      viewersByAuction[auctionId].add(socket.id);

      // Broadcast the updated count to all clients in this auction
      io.to(auctionId).emit(
        "viewersCountUpdate",
        viewersByAuction[auctionId].size
      );
    });

    socket.on("leaveAuction", (auctionId) => {
      if (viewersByAuction[auctionId]) {
        viewersByAuction[auctionId].delete(socket.id); // Remove the viewer
        // Broadcast the updated count to all clients in this auction
        io.to(auctionId).emit(
          "viewersCountUpdate",
          viewersByAuction[auctionId].size
        );

        // Clean up if no viewers are left for this auction
        if (viewersByAuction[auctionId].size === 0) {
          delete viewersByAuction[auctionId];
        }
      }
    });

    socket.on("placeBid", (auctionId, bidAmount) => {
      const updatedAuction = {
        _id: auctionId,
        currentBid: bidAmount,
      };
      io.emit("bidUpdate", updatedAuction);
    });
  });
};

export default socketSetup;
