require('dotenv').config();
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Miejsca do zobaczenia`,
    siteUrl: `https://www.yourdomain.tld`,
    gmapKey: process.env.GATSBY_GMAPS_KEY,
  },
  plugins: [
    {
      resolve: 'gatsby-source-flotiq',
      options: {
        authToken: process.env.GATSBY_FLOTIQ_API_KEY,
        includeTypes: ['attraction', '_media'],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss'
  ]
};
