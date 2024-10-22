import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import Pagination from "./Pagination";

// Component to display the list of auctions
const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch auctions from the API
  const fetchAuctions = async () => {
    try {
      setLoading(true); // Start loading state
      const response = await fetch(`http://localhost:5000/api/auctions`);
      const data = await response.json();
      console.log("API Response:", data);

      // Check if the response contains the "auctions" array
      if (data && Array.isArray(data.auctions)) {
        setAuctions(data.auctions);
      } else {
        setAuctions([]);
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to load auctions");
      setLoading(false);
    }
  };

  // Handle page change event
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Load auctions when the component mounts
  useEffect(() => {
    fetchAuctions();
  }, []); // Empty dependency array to fetch only once on mount

  // Calculate the indices for slicing the auctions array
  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = auctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  // Display loading state or error message if applicable
  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  // Calculate total pages for pagination
  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Auction List</h1>
      <div style={styles.itemsPerPage}>
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value)); // Update items per page
            setCurrentPage(1); // Reset to the first page on change
          }}
          style={styles.select}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {currentAuctions.length === 0 ? (
        <div style={styles.noAuctions}>No auctions found</div> // Message if no auctions found
      ) : (
        <div className="auction-list">
          {currentAuctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} /> // Render AuctionCard for each auction
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} // Pass page change handler to Pagination component
      />
    </div>
  );
};

// Styles for the AuctionList component
const styles = {
  container: {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  itemsPerPage: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  select: {
    marginLeft: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#34495e",
    color: "#ecf0f1",
  },
  loading: {
    textAlign: "center",
    color: "#3498db",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  noAuctions: {
    textAlign: "center",
    color: "#ecf0f1",
  },
};

export default AuctionList;
