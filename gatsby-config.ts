require('dotenv').config();

export default {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Sounds Vegan',
    description: '',
    // will be changed when we go live
    // siteUrl: `https://cardamonchai.amreis.de`,
    siteUrl: `https://soundsvegan.com`,
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
                description: `<p style="font-size: 1.5em; color: #fff">${
                  edge.node?.frontmatter?.subTitle
                }</p>
<p><img src="${edge.node?.frontmatter?.image}" alt="${
                  edge.node?.frontmatter?.title
                }" /><p>
<p style="font-size: 1.25em;  color: #f0ecee">${
                  edge.node.frontmatter?.excerpt ||
                  edge.node.frontmatter?.description
                }</p>
${
  edge.node.frontmatter?.languageLink
    ? '<p style="font-size: 1.1em;  color: #f0ecee">🇬🇧 English version available</p>'
    : ''
}`,
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
      frontmatter: { 
        language: { ne: "en" }
        date: {lte: "${new Date().toISOString()}"}
      }
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
          languageLink
          remoteThumbnailImage
          image
        }
      }
    }
  }
}`,
            output: '/rss.xml',
            title: 'soundsvegan.com',
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
        path: `${__dirname}/content/config`,
        name: 'config',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [{ resolve: 'gatsby-remark-numbered-footnotes' }],
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/gatsby/algolia'),
      },
    },
    { resolve: 'gatsby-plugin-netlify-cms' },
  ],
};
