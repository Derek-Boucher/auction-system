import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const styles = {
    pagination: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    },
    button: {
      backgroundColor: "#f96d00",
      color: "#ecf0f1",
      border: "none",
      borderRadius: "8px",
      padding: "10px 15px",
      margin: "0 5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      maxWidth: "40px",
    },
    activeButton: {
      backgroundColor: "#be5300",
      color: "#fff",
    },
  };

  return (
    <div style={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...styles.button,
            ...(page === currentPage ? styles.activeButton : {}), // Applique les styles actifs si la page est actuelle
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
