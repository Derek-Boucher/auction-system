import React, { useEffect, useState } from "react";
import "../styles/AuctionList.css";
import AuctionCard from "./AuctionCard";
import Pagination from "./Pagination";

const AuctionList = () => {
  // Stores all auctions data
  const [allAuctions, setAllAuctions] = useState([]);
  // Auctions filtered by search term and pagination
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [totalAuctions, setTotalAuctions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetches auctions data from API
  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/auctions?page=1&limit=20`
      );
      const data = await response.json();
      setAllAuctions(data.auctions || []);
      setTotalAuctions(data.auctions?.length || 0);
      setLoading(false);
    } catch (error) {
      setError("Failed to load auctions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  // Filters auctions based on search term and applies pagination
  useEffect(() => {
    const filtered = allAuctions.filter((auction) => {
      const titleMatches = auction.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatches = auction.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return (titleMatches || descriptionMatches) && !auction.isEnded;
    });

    const indexOfLastAuction = currentPage * itemsPerPage;
    const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
    setFilteredAuctions(
      filtered.slice(indexOfFirstAuction, indexOfLastAuction)
    );
    setTotalAuctions(filtered.length);
  }, [searchTerm, allAuctions, currentPage, itemsPerPage]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="auction-list-container">
      <h1 className="title">Auction List</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Items per page selector */}
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

      {/* Display filtered auctions */}
      {filteredAuctions.length === 0 ? (
        <div className="no-auctions">No auctions found</div>
      ) : (
        <div className="auction-grid">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalAuctions / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AuctionList;
