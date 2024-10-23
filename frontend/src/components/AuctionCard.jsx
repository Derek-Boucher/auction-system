import React from "react";
import { Link } from "react-router-dom";
import "../styles/AuctionCard.css";

const AuctionCard = ({ auction }) => {
  return (
    <div className="auction-card">
      <Link to={`/auction/${auction._id}`} className="auction-link">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="auction-image"
        />
        <div className="auction-details">
          <h3>{auction.title}</h3>
          <p>Current Bid: ${auction.currentBid}</p>
          <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
