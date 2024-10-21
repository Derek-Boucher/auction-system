import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard'; // Assurez-vous que le chemin d'importation est correct
import Pagination from './Pagination'; // Assurez-vous que le chemin est correct

// Composant pour afficher la liste des enchères
const AuctionList = () => {
  const [auctions, setAuctions] = useState([]); // État pour stocker toutes les enchères
  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // État pour le nombre d'éléments par page

  // Récupérer toutes les enchères
  const fetchAuctions = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`http://localhost:5000/api/auctions`);
      const data = await response.json();
      console.log('API Response:', data); // Pour vérifier la structure de la réponse
      
      // Vérifiez que data est un tableau
      if (Array.isArray(data)) {
        setAuctions(data); // Stocker toutes les enchères
      } else {
        setAuctions([]); // Effacer les enchères si ce n'est pas un tableau
      }
      
      setLoading(false); // End loading
    } catch (error) {
      setError('Failed to load auctions'); // Gérer les erreurs
      setLoading(false); // End loading even on error
    }
  };  

  const handlePageChange = (page) => {
    setCurrentPage(page); // Met à jour la page actuelle
  };

  // Charger toutes les enchères au démarrage
  useEffect(() => {
    fetchAuctions(); // Appeler la fonction pour récupérer toutes les enchères
  }, []); // Dépendance vide pour ne charger qu'une seule fois

  // Calculer les enchères à afficher pour la page actuelle
  const indexOfLastAuction = currentPage * itemsPerPage; // Index du dernier élément
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage; // Index du premier élément
  const currentAuctions = auctions.slice(indexOfFirstAuction, indexOfLastAuction); // Enchères pour la page actuelle

  // Affichage de l'état de chargement ou des erreurs
  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  // Calculer le total de pages
  const totalPages = Math.ceil(auctions.length / itemsPerPage); // Total de pages basé sur le nombre total d'enchères

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Auction List</h1>
      <div style={styles.itemsPerPage}>
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value)); // Met à jour le nombre d'éléments par page
            setCurrentPage(1); // Réinitialiser à la première page sur changement
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
        <div style={styles.noAuctions}>No auctions found</div> // Message si aucune enchère trouvée
      ) : (
        <div className="auction-list"> {/* Utilise la classe CSS existante pour le style */} 
          {currentAuctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} /> // Utiliser le composant AuctionCard
          ))}
        </div>
      )}
  
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

// Styles pour le composant AuctionList
const styles = {
  container: {
    backgroundColor: '#2c3e50', // Fond sombre
    color: '#ecf0f1', // Couleur du texte claire
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)', // Ombre pour un effet moderne
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  itemsPerPage: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  select: {
    marginLeft: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#34495e', // Fond sombre pour le sélecteur
    color: '#ecf0f1', // Texte clair pour le sélecteur
  },
  loading: {
    textAlign: 'center',
    color: '#3498db', // Couleur pour l'état de chargement
  },
  error: {
    textAlign: 'center',
    color: 'red', // Couleur pour l'erreur
  },
  noAuctions: {
    textAlign: 'center',
    color: '#ecf0f1', // Couleur pour le message "aucune enchère"
  },
};

export default AuctionList;
