require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Victor Photos`,
    description: ``,
    author: `@victorlandim`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-image`,
    {
      resolve: `gatsby-transformer-sharp`
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 95,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `victor-photos`,
        short_name: `victor-photos`,
        start_url: `/`,
        background_color: `#333`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your WordPress source
        baseUrl: `2665153697.photo.blog`,
        protocol: `https`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: true,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: false,
        auth: {
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_app_clientId: "68288",
          wpcom_user: "victorlandim5",
          wpcom_pass: process.env.WORDPRESS_PASSWORD,
        },
      },
    },
    `gatsby-plugin-sass`
  ],
}
