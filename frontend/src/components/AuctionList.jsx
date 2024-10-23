import React, { useEffect, useState } from "react";
import "../styles/AuctionList.css"; // Assurez-vous que ce fichier est correctement lié
import AuctionCard from "./AuctionCard";
import Pagination from "./Pagination";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchAuctions = async () => {
    try {
      setLoading(true); // Start loading state
      const response = await fetch(`http://localhost:5000/api/auctions`);
      const data = await response.json();
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

  useEffect(() => {
    fetchAuctions();
  }, []);

  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = auctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  return (
    <div className="auction-list-container">
      <h1 className="title">Auction List</h1>
      <div className="items-per-page">
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {currentAuctions.length === 0 ? (
        <div className="no-auctions">No auctions found</div>
      ) : (
        <div className="auction-grid">
          {currentAuctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AuctionList;
