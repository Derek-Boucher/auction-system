import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Utilisation des boutons Bootstrap
import CreateAuctionModal from "./CreateAuctionModal";

const ActionBanner = () => {
  const [hoveredCA, setHoveredCA] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmAuction = async (auctionData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      alert("You must be logged in to create an auction.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auctions/newAuction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...auctionData,
            createdBy: user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create auction");
      }

      const data = await response.json();
      console.log("Auction created successfully:", data);

      setShowModal(false);
    } catch (error) {
      console.error("Error creating auction:", error);
    }
  };

  return (
    <div style={styles.banner}>
      <h1 style={styles.heading}>Find the Best Deals</h1>
      <p style={styles.text}>Join an auction now or create your own!</p>
      <div style={styles.buttonContainer}>
        <Button
          variant="primary"
          style={{ ...styles.button, ...(hoveredCA ? styles.buttonHover : {}) }}
          onMouseEnter={() => setHoveredCA(true)}
          onMouseLeave={() => setHoveredCA(false)}
          onClick={handleOpenModal}
        >
          Create Auction
        </Button>
      </div>

      <CreateAuctionModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAuction}
        backdrop="static"
        keyboard={false}
        centered
      />
    </div>
  );
};

const styles = {
  banner: {
    backgroundColor: "#393e46",
    padding: "2rem",
    textAlign: "center",
    color: "#f2f2f2",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#f96d00",
    color: "#f2f2f2",
    padding: "1.2rem 1.2rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: "14px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    minWidth: "20px",
    maxWidth: "150px",
  },
  buttonHover: {
    backgroundColor: "#be5300",
    transform: "scale(1.05)",
  },
};

export default ActionBanner;
