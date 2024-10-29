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
  const [viewersCount, setViewersCount] = useState(0);

  // Fetch auction details
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

  // Initial fetch of auction details
  useEffect(() => {
    fetchAuctionDetails();
  }, [fetchAuctionDetails]);

  // Socket listeners for bids and viewers count
  useEffect(() => {
    socket.on("bidUpdate", (updatedAuction) => {
      setAuction(updatedAuction);
    });

    socket.emit("joinAuction", id); // Join the auction room

    socket.on("viewersCountUpdate", (count) => {
      setViewersCount(count); // Update viewer count for this specific auction
    });

    // Cleanup function
    return () => {
      socket.emit("leaveAuction", id); // Leave the auction room on unmount
      socket.off("bidUpdate");
      socket.off("viewersCountUpdate");
    };
  }, [id]);

  // Handle bid submission
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

    if (bidAmount <= auction.startingBid) {
      setError(
        `Bid must be greater than the starting bid of $${auction.startingBid}`
      );
      return;
    }

    if (bidAmount <= auction.currentBid) {
      setError(
        `Bid must be greater than the current bid of $${auction.currentBid}`
      );
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

  // Check if auction has ended
  const isAuctionEnded = auction && new Date() > new Date(auction.endTime);
  const isUserWinner =
    auction &&
    user &&
    auction.bids.length > 0 &&
    auction.bids[auction.bids.length - 1].userId === user.id;

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.background}>
      <Header />

      <div style={styles.container}>
        <h1 style={styles.title}>Auction Detail</h1>
        <p style={styles.viewersCount}>Viewers: {viewersCount}</p>
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

        {/* Conditional rendering for buttons */}
        {isAuctionEnded ? (
          isUserWinner ? (
            <Link to={`/payment/${id}`} style={styles.button}>
              <button style={styles.button}>Proceed to Payment</button>
            </Link>
          ) : (
            <p style={styles.message}>Auction has ended. You did not win.</p>
          )
        ) : (
          <form onSubmit={handleBidSubmit} style={styles.form}>
            <label style={styles.label}>
              Your Bid:
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={
                  auction
                    ? Math.max(auction.currentBid, auction.startingBid) + 1
                    : 1
                }
                style={styles.input}
                required
              />
            </label>
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.button}>
              Place Bid
            </button>
          </form>
        )}
        {success && <div style={styles.success}>{success}</div>}
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
    minHeight: "76vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#f96d00",
  },
  viewersCount: {
    textAlign: "center",
    color: "#f96d00",
    marginBottom: "20px",
    fontSize: "1.2em",
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
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#f96d00",
    color: "#ecf0f1",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
    textAlign: "center",
    display: "block",
    width: "100%",
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
  backLink: {
    display: "block",
    textAlign: "center",
    marginTop: "20px",
    color: "#f96d00",
    textDecoration: "none",
  },
};

export default AuctionDetail;
