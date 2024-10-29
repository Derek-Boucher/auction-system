import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";

const WonAuctionsList = ({ userId }) => {
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWonAuctions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auctions/won/${userId}`
      );
      const data = await response.json();
      if (data && Array.isArray(data.auctions)) {
        setWonAuctions(data.auctions);
      } else {
        setWonAuctions([]);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load won auctions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWonAuctions();
  }, [userId]);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (wonAuctions.length === 0) return <div>No won auctions found</div>;

  return (
    <div id="won-auctions" style={styles.wonAuctionsList}>
      <h2 style={styles.title}>My Won Auctions</h2>
      <div style={styles.auctionGrid}>
        {wonAuctions.map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

// Inline styles object
const styles = {
  wonAuctionsList: {
    paddingTop: "20px",
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
    color: "red", // Optionally change color for errors
  },
};

export default WonAuctionsList;
