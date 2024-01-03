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
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-crazyegg`,
      options: {
        accountNumber: process.env.CRAZYEGG_ACCOUNT_NUMBER,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-sdk`,
      options: {
        appId: "407292099637758",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v7.0",
      },
    },
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
    //Blog related plugins below
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true,
              showCaptions: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true,
              showCaptions: true,
            },
          },
        ],
      },
    },
  ],
};
