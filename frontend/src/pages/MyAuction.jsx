import React, { useContext, useEffect, useState } from "react";
import AuctionCard from "../components/AuctionCard"; // Importez le composant AuctionCard
import FinishedAuctionsList from "../components/FinishedAuctionsList.jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination"; // Importez le composant Pagination
import SecondNavBar from "../components/SecondNavBar";
import WonAuctionsList from "../components/WonAuctionsList";
import { UserContext } from "../context/UserContext"; // Importez le UserContext

const MyAuctions = () => {
  const { user, loadingUser } = useContext(UserContext); // Récupérez l'utilisateur et le loadingUser du contexte
  const [auctions, setAuctions] = useState([]); // État pour stocker les enchères
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les messages d'erreur
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const [itemsPerPage, setItemsPerPage] = useState(10); // État pour le nombre d'éléments par page
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche

  useEffect(() => {
    const fetchMyAuctions = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/auctions/users/${user.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch auctions");
          }
          const data = await response.json();
          console.log("Fetched auctions:", data.auctions);
          setAuctions(data.auctions || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    // Fetch only if loadingUser is false
    if (!loadingUser) {
      fetchMyAuctions();
    }
  }, [user, loadingUser]); // Exécutez l'effet chaque fois que l'utilisateur ou loadingUser change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filtrer les enchères en fonction du terme de recherche
  const filteredAuctions = auctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = filteredAuctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

  return (
    <div>
      <div style={styles.myAuction}>
        <Header />
        <SecondNavBar />
        <WonAuctionsList />
        <FinishedAuctionsList />
        <div id="my-auctions" style={styles.container}>
          <h1 style={styles.title}>My Auctions</h1>

          {/* Barre de recherche */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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

          {currentAuctions.length > 0 ? (
            <div className="auction-list" style={styles.auctionGrid}>
              {currentAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          ) : (
            <p>No auctions found.</p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    minHeight: "800px",
    margin: "0 auto",
    backgroundColor: "#222831",
    color: "#ecf0f1",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    marginTop: "100px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  auctionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  myAuction: {
    backgroundColor: "rgb(57, 62, 70)",
  },
};

export default MyAuctions;
