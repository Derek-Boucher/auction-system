import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";

const socket = io("http://localhost:5000");

const AuctionDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch auction details from the API
  const fetchAuctionDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/auctions/${id}`);
      const data = await response.json();
      if (response.ok) {
        setAuction(data);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch auction details");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch auction details");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAuctionDetails();
  }, [fetchAuctionDetails]);

  useEffect(() => {
    // Listen for bid updates from the server
    socket.on("bidUpdate", (updatedAuction) => {
      setAuction(updatedAuction); // Update auction state with the latest auction data
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.off("bidUpdate");
    };
  }, []); // No dependencies, only runs once on mount

  // Function to handle bid submission
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (bidAmount === "" || isNaN(bidAmount)) {
      setError("Please enter a valid bid amount");
      return;
    }

    if (!user) {
      setError("You must be logged in to place a bid");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auctions/${id}/bid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ bidAmount: Number(bidAmount) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Bid placed successfully");
        setError(null);
        setBidAmount("");
      } else {
        setError(data.message || "Failed to place bid");
        setSuccess(null);
      }
    } catch (error) {
      setError("Failed to place bid");
      setSuccess(null);
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.background}>
      <Header />

      <div style={styles.container}>
        <h1 style={styles.title}>Auction Detail</h1>
        {auction && (
          <div style={styles.auctionDetail}>
            <img
              src={auction.imageUrl}
              alt={auction.title}
              style={styles.image}
            />
            <div style={styles.details}>
              <h2 style={styles.title}>{auction.title}</h2>
              <p>{auction.description}</p>
              <p>Starting Bid: ${auction.startingBid}</p>
              <p>Current Bid: ${auction.currentBid}</p>
              <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Form to place a bid */}
        <form onSubmit={handleBidSubmit} style={styles.form}>
          <label style={styles.label}>
            Your Bid:
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={auction ? auction.currentBid + 1 : 1}
              style={styles.input}
              required
            />
          </label>
          <button type="submit" style={styles.button}>
            Place Bid
          </button>
        </form>

        {success && <div style={styles.success}>{success}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <Link to="/auctions" style={styles.backLink}>
          Back to Auction List
        </Link>
      </div>
      <Footer />
    </div>
  );
};

// Updated styles for the AuctionDetail component
const styles = {
  background: {
    backgroundColor: "#393e46",
  },
  container: {
    backgroundColor: "#222831",
    color: "#333",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    maxWidth: "800px",
    margin: "40px auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#f96d00",
  },
  auctionDetail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  details: {
    textAlign: "center",
    color: "#7f8c8d",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  label: {
    marginBottom: "10px",
    fontSize: "1.2rem",
    color: "#f96d00",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #f96d00",
    width: "200px",
    marginLeft: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#f96d00",
    color: "#ecf0f1",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: "10px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
  loading: {
    textAlign: "center",
    color: "#3498db",
  },
  backLink: {
    display: "block",
    textAlign: "center",
    marginTop: "20px",
    color: "#f96d00",
    textDecoration: "none",
  },
};

export default AuctionDetail;
