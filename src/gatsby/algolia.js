"use strict";
const indexName = `Pages`;
const pageQuery = `{
  site {
    siteMetadata {
      siteUrl
    }
  }
  pages: allMdx(
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
        id
        frontmatter {
          title
          subTitle
          description
          focusKeyword
          labels
          remoteThumbnailImage
          languageLink
          advertisement
          affiliate
          image
        }
        fields {
          path
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;
function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }, baseImageUrl) {
    const image = frontmatter.remoteThumbnailImage || frontmatter.image;
    delete frontmatter.remoteThumbnailImage;
    delete frontmatter.image;
    return {
        objectID: id,
        ...frontmatter,
        ...fields,
        ...rest,
        image,
    };
}
const queries = [
    {
        query: pageQuery,
        transformer: ({ data, }) => {
            return data.pages.edges.map((page) => pageToAlgoliaRecord(page, data.site.siteMetadata.siteUrl));
        },
        indexName,
        settings: { attributesToSnippet: [`excerpt:25`] },
    },
];
module.exports = queries;
