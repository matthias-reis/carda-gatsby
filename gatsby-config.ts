import { ENGINE_METHOD_DIGESTS } from 'node:constants';

require('dotenv').config();

export default {
  siteMetadata: {
    title: 'Cardamonchai.com',
    description: "Rock'n'Roll vegan.",
    // will be changed when we go live
    siteUrl: `https://cardamonchai.amreis.de`,
    // siteUrl: `https://cardamonchai.com`,
  },
  flags: {
    DEV_SSR: false,
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMdx },
            }: {
              query: { site: any; allMdx: { edges: any[] } };
            }) => {
              return allMdx.edges.map((edge: any) => ({
                ...edge.node.fields,
                ...edge.node.frontmatter,
                description:
                  edge.node.frontmatter.excerpt ||
                  edge.node.frontmatter.description,
                url: site.siteMetadata.siteUrl + edge.node.fields.path,
                guid: site.siteMetadata.siteUrl + edge.node.fields.path,
              }));
            },
            query: `
{
  allMdx(
    limit: 30
    sort: { fields: frontmatter___date, order: DESC }
    filter: {
      frontmatter: { language: { ne: "en" } }
      fields: { type: { in: ["article", "wordpress"] } }
    }
  ) {
    edges {
      node {
        fields {
          path
        }
        frontmatter {
          title
          subTitle
          description
          excerpt
          typeName
          date
          remoteThumbnailImage
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 70) {
                src
              }
            }
          }
        }
      }
    }
  }
}`,
            output: '/rss.xml',
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
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
          // {
          //   resolve: `gatsby-remark-relative-images`,
          //   options: {
          //     exclude: ['ogImage'],
          //   },
          // },
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
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/gatsby/algolia'),
      },
    },
  ],
};
