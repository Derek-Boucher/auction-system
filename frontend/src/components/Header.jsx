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
            <a href="/" style={styles.link}>
              Home
            </a>{" "}
            {/* Apply link styles */}
          </li>
          <li>
            <a href="/myAuctions" style={styles.link}>
              My Auctions
            </a>{" "}
            {/* Apply link styles */}
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
              <a href="/login" style={styles.link}>
                Login
              </a>{" "}
              {/* Apply link styles */}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#222831",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#f2f2f2",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#f96d00",
  },
  nav: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    marginRight: "1rem",
  },
  welcomeMessage: {
    marginRight: "1rem",
    display: "flex",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#f96d00",
    border: "none",
    color: "#f2f2f2",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  link: {
    color: "#f2f2f2",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default Header;
