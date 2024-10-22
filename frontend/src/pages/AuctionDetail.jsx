import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AuctionDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch auction details from the API
  const fetchAuctionDetails = async () => {
    try {
      setLoading(true); // Start loading state
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
      setError("Failed to fetch auction details"); // Handle fetch errors
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctionDetails();
  }, [id]);

  // Function to handle bid submission
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (bidAmount === "" || isNaN(bidAmount)) {
      setError("Please enter a valid bid amount"); // Validate bid amount input
      return;
    }

    if (!user) {
      setError("You must be logged in to place a bid"); // Check if user is logged in
      return;
    }

    try {
      // Send bid request to the API
      const response = await fetch(
        `http://localhost:5000/api/auctions/${id}/bid`,
        {
          method: "POST", // Set request method to POST
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ bidAmount: Number(bidAmount) }), // Send bid amount in request body
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Bid placed successfully");
        setError(null);
        setBidAmount("");
        fetchAuctionDetails();
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
            <h2>{auction.title}</h2>
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
  );
};

// Styles for the AuctionDetail component
const styles = {
  container: {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    maxWidth: "800px",
    margin: "40px auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
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
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    width: "200px",
    marginLeft: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3498db",
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
    color: "#3498db",
    textDecoration: "none",
  },
};

export default AuctionDetail;
