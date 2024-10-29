import React from "react";

const SecondNavBar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav style={styles.navContainer}>
      <button
        style={styles.navButton}
        onClick={() => scrollToSection("my-auctions")}
      >
        My Auctions
      </button>
      <button
        style={styles.navButton}
        onClick={() => scrollToSection("won-auctions")}
      >
        My Won Auctions
      </button>
      <button
        style={styles.navButton}
        onClick={() => scrollToSection("finished-auctions")}
      >
        My Finished Auctions
      </button>
    </nav>
  );
};

const styles = {
  navContainer: {
    display: "flex",
    marginLeft: "25%",
    maxWidth: "50%",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    padding: "8px 15px",
    borderRadius: "5px",
  },
  navButton: {
    padding: "5px 10px",
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#ecf0f1",
    backgroundColor: "#f96d00",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default SecondNavBar;
