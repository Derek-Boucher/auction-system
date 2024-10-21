import React from 'react';
import AuctionList from '../components/AuctionList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ActionBanner from '../components/ActionBanner';

const HomePage = () => {
  return (
    <div>
      <Header />
      <ActionBanner />
      <AuctionList />
      <Footer />
    </div>
  );
};

export default HomePage;
