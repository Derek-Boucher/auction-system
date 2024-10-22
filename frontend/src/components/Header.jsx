import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.js";

const Header = () => {
  const { user, logout } = useContext(UserContext); // Use the UserContext

  return (
    <header style={styles.header}>
      <div style={styles.logo}>AuctionApp</div>
      <nav>
        <ul style={styles.nav}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/auctions">Auctions</a>
          </li>
          {user ? (
            <>
              <li style={styles.welcomeMessage}>
                Welcome, {user.firstName} {user.lastName}!
              </li>
              <li>
                <button onClick={logout} style={styles.logoutButton}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#3498db",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
  },
  welcomeMessage: {
    marginRight: "1rem",
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Header;
