import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import Facebook from "./Facebook";
import Twitter from "./Twitter";
import adLogo from "../../images/axiedailylogo.png";
const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  // I put it here since there was a fucking error with useStaticQuery and there's no fucking working solution
  const siteMetadata = {
    defaultTitle: `AxieDaily | Daily Dose of Axie Infinity`,
    defaultDescription: `A site that contains everything under the sun for Axie Infinity (Guides, News, Tidbits)`,
    author: `Wozniakwtf`,
    defaultImage: { adLogo },
    twitterUsername: "@axiedailygg",
    facebook: "axiedailygg",
    url: "https://axiedaily.com",
  };
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    facebook,
  } = siteMetadata;
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };
  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {article && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}{" "}
      <Facebook
        desc={seo.description}
        image={seo.image}
        title={seo.title}
        type={article ? "article" : "website"}
        url={seo.url}
        locale="en"
        name={facebook}
      />
      <Twitter
        title={seo.title}
        image={seo.image}
        desc={seo.description}
        username={twitterUsername}
      />
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
