import React, { useEffect, useState } from "react";
import "../styles/AuctionList.css";
import AuctionCard from "./AuctionCard";
import Pagination from "./Pagination";

const AuctionList = () => {
  const [allAuctions, setAllAuctions] = useState([]); // Stocke toutes les enchères
  const [filteredAuctions, setFilteredAuctions] = useState([]); // Enchères filtrées selon la recherche
  const [totalAuctions, setTotalAuctions] = useState(0); // Nombre total d'enchères
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // Barre de recherche

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/auctions`);
      const data = await response.json();

      if (data && Array.isArray(data.auctions)) {
        setAllAuctions(data.auctions); // Enchères complètes pour la recherche
        setTotalAuctions(data.totalAuctions); // Total des enchères pour la pagination
        setFilteredAuctions(data.auctions); // Initialiser les enchères filtrées
        setFilteredAuctions(data.auctions.slice(0, itemsPerPage)); // Initialiser les enchères visibles
      } else {
        setAllAuctions([]);
        setTotalAuctions(0);
        setFilteredAuctions([]); // Initialiser à un tableau vide si aucune enchère
        setFilteredAuctions([]);
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

  useEffect(() => {
    const filtered = allAuctions.filter((auction) => {
      const titleMatches =
        auction.title &&
        auction.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatches =
        auction.description &&
        auction.description.toLowerCase().includes(searchTerm.toLowerCase());

      return (titleMatches || descriptionMatches) && !auction.isEnded;
    });

    setFilteredAuctions(filtered);

    // Pagination
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

      {/* Barre de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sélection du nombre d'items par page */}
      <div className="items-per-page">
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Réinitialiser à la première page
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Affichage des enchères */}
      {filteredAuctions.length === 0 ? (
        <div className="no-auctions">No auctions found</div>
      ) : (
        <div className="auction-grid">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalAuctions / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AuctionList;
