import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>AuctionApp</div>
      <nav>
        <ul style={styles.nav}>
          <li><a href="/">Home</a></li>
          <li><a href="/auctions">Auctions</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#3498db',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
  }
};

export default Header;
