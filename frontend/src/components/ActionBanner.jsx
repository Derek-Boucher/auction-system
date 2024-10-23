import React, { useState } from "react";

const ActionBanner = () => {
  const [hoveredCA, setHoveredCA] = useState(false);

  return (
    <div style={styles.banner}>
      <h1 style={styles.heading}>Find the Best Deals</h1>
      <p style={styles.text}>Join an auction now or create your own!</p>
      <div style={styles.buttonContainer}>
        <button
          style={{ ...styles.button, ...(hoveredCA ? styles.buttonHover : {}) }}
          onMouseEnter={() => setHoveredCA(true)}
          onMouseLeave={() => setHoveredCA(false)}
        >
          Create Auction
        </button>
      </div>
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
