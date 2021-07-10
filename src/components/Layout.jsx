import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import SEO from "./SEO/SEO";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.ico";
const Layout = ({ children, customSEO }) => {
  return (
    <div>
      <Helmet>
        <link rel="icon" href={favicon} />
      </Helmet>
      {!customSEO && <SEO />}
      <coingecko-coin-price-marquee-widget
        coin-ids="ethereum,smooth-love-potion,axie-infinity"
        currency="usd"
        background-color="#ffffff"
        locale="en"
      ></coingecko-coin-price-marquee-widget>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  customSEO: PropTypes.bool,
};

Layout.defaultProps = {
  customSEO: false,
};
