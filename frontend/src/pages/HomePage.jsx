import React from "react";
import ActionBanner from "../components/ActionBanner";
import AuctionList from "../components/AuctionList";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div style={styles.background}>
      <Header />
      <ActionBanner />
      <AuctionList />
      <Footer />
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: "#393e46",
  },
};

export default HomePage;
