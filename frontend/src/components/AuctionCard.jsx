import React from 'react';
import '../styles/AuctionCard.css';

const AuctionCard = ({ auction }) => {
  return (
    <div className="auction-card">
      <img src={auction.imageUrl} alt={auction.title} className="auction-image" />
      <div className="auction-details">
        <h3>{auction.title}</h3>
        <p>Starting Bid: ${auction.startingBid}</p>
        <p>{auction.description}</p>
      </div>
    </div>
  );
};

export default AuctionCard;
