require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Oplæsning af undertekster`,
    description: `Få oplæste undertekster på udenlandske film med SubReader på tværs af dine streamingtjenester i dag!`,
    keywords: `SubReader, undertekster, oplæste undertekster, streamingtjenester, Oplæsning af undertekster, SubReader aps, SubReader Plus, SubReader Bio, Dyleski, Ordblind, Dyleksi værktøj, Ordblind værktøj `,
    author: `@gatsbyjs`,
    supportedLanguages: ["no", "da", "sv", "se"],
  },
  plugins: [
    // Typescript support
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "SRAPI",
        fieldName: "api",
        url: process.env.GATSBY_API_ENDPOINT,
        headers: {
          "accept-language": "da",
        },
      },
    },

    // Image support
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    // Styling
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,

    // SEO
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/icons/favicon.svg`,
      },
    },

    // Google fonts
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Lato\:400,700,900,400i,700i`, `Montserrat\:500,700`],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
  ],
};
