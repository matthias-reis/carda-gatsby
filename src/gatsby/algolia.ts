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
          image {
            childrenImageSharp {
              resize(width: 600) {
                src
              }
            }
          }
        }
        fields {
          path
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

type IndexRecord = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      subTitle: string;
      description: string;
      focusKeyword: string;
      remoteThumbnailImage?: string;
      advertisement?: boolean;
      affiliate?: boolean;
      languageLink?: string;
      image?: {
        childrenImageSharp?: { resize?: { src?: string } };
      };
      labels: string[];
    };
    fields: {
      path: string;
    };
    excerpt: string;
  };
};

function pageToAlgoliaRecord(
  { node: { id, frontmatter, fields, ...rest } }: IndexRecord,
  baseImageUrl: string
) {
  const image =
    frontmatter.remoteThumbnailImage ||
    baseImageUrl + '/' + frontmatter.image?.childrenImageSharp?.resize?.src;
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
    transformer: ({
      data,
    }: {
      data: {
        site: { siteMetadata: { url: string } };
        pages: { edges: IndexRecord[] };
      };
    }) =>
      data.pages.edges.map((page) =>
        pageToAlgoliaRecord(page, data.site.siteMetadata.url)
      ),
    indexName,
    settings: { attributesToSnippet: [`excerpt:25`] },
  },
];
module.exports = queries;
