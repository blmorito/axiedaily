require("dotenv").config({
  path: `.env`,
});
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "AxieDaily",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CFL_SPACE_ID,
        accessToken: process.env.CFL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `axiedaily`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-postcss",
    "gatsby-plugin-dark-mode",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-SZZL0W65HD", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          // respectDNT: true,
          // // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: "",
    //   },
    // },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
