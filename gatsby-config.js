"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    siteMetadata: {
        title: 'Cardamonchai.com',
        description: "Rock 'n' Roll vegan.",
        // will be changed when we go live
        // siteUrl: `https://cardamonchai.amreis.de`,
        siteUrl: `https://cardamonchai.com`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
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
                        serialize: ({ query: { site, allMdx }, }) => {
                            return allMdx.edges.map((edge) => {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                return ({
                                    ...edge.node.fields,
                                    ...edge.node.frontmatter,
                                    description: `<p style="font-size: 1.5em; color: #fff">${(_b = (_a = edge.node) === null || _a === void 0 ? void 0 : _a.frontmatter) === null || _b === void 0 ? void 0 : _b.subTitle}</p>
<p><img src="${(_d = (_c = edge.node) === null || _c === void 0 ? void 0 : _c.frontmatter) === null || _d === void 0 ? void 0 : _d.image}" alt="${(_f = (_e = edge.node) === null || _e === void 0 ? void 0 : _e.frontmatter) === null || _f === void 0 ? void 0 : _f.title}" /><p>
<p style="font-size: 1.25em;  color: #f0ecee">${((_g = edge.node.frontmatter) === null || _g === void 0 ? void 0 : _g.excerpt) ||
                                        ((_h = edge.node.frontmatter) === null || _h === void 0 ? void 0 : _h.description)}</p>
${((_j = edge.node.frontmatter) === null || _j === void 0 ? void 0 : _j.languageLink)
                                        ? '<p style="font-size: 1.1em;  color: #f0ecee">🇬🇧 English version available</p>'
                                        : ''}`,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.path,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                                });
                            });
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
                        title: "Cardamonchai.com - Rock 'n' Roll vegan",
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
