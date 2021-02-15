export default {
  siteMetadata: {
    title: 'Cardamonchai.com',
    description: "Rock'n'Roll vegan.",
    siteUrl: `https://cardamonchai.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        createLinkInHead: true,
      },
    },
    'gatsby-plugin-webpack-size',
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-yaml`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages`,
        name: 'page',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/articles`,
        name: 'article',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/wordpress/articles`,
        name: 'wordpress',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/config`,
        name: 'config',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-numbered-footnotes' },
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              staticFolderName: 'static',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms.ts`,
      },
    },
    `gatsby-plugin-emotion`,
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
