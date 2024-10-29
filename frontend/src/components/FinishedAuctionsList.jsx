import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext
import AuctionCard from "./AuctionCard";

const FinishedAuctionsList = () => {
  const { user } = useContext(UserContext); // Access user info
  const [finishedAuctions, setFinishedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinishedAuctions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auctions");
      const data = await response.json();

      // Filter for auctions that are ended and created by the current user
      const userAuctions = data.auctions.filter(
        (auction) => auction.isEnded && auction.createdBy === user.id
      );

      setFinishedAuctions(userAuctions);
    } catch (err) {
      setError("Failed to load finished auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchFinishedAuctions();
    }
  }, [user]);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (finishedAuctions.length === 0)
    return <div>No finished auctions found</div>;

  return (
    <div id="finished-auctions" style={styles.finishedAuctionsList}>
      <h2 style={styles.title}>My Finished Auctions</h2>
      <div style={styles.auctionGrid}>
        {finishedAuctions.map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

// Inline styles object, same as in WonAuctionsList
const styles = {
  finishedAuctionsList: {
    marginTop: "6rem",
    padding: "20px",
    maxWidth: "1200px",
    minHeight: "800px",
    margin: "0 auto",
    backgroundColor: "#222831",
    color: "#ecf0f1",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ecf0f1",
  },
  auctionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  loading: {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "1.2rem",
  },
  error: {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "1.2rem",
    color: "red",
  },
};

export default FinishedAuctionsList;
