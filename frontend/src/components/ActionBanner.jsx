import React from 'react';

const ActionBanner = () => {
  return (
    <div style={styles.banner}>
      <h1>Find the Best Deals</h1>
      <p>Join an auction now or create your own!</p>
      <button style={styles.button}>Browse Auctions</button>
      <button style={styles.button}>Create Auction</button>
    </div>
  );
};

const styles = {
  banner: {
    backgroundColor: '#2ecc71',
    padding: '2rem',
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ActionBanner;
