import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 AuctionApp. All Rights Reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333333",
    color: "#ecf0f1",
    textAlign: "center",
    padding: "1rem",
    position: "relative",
    bottom: "0",
    marginTop: "40px",
  },
};

export default Footer;
