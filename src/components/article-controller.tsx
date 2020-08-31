import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";

import { RawArticle } from "../types";

import { Article } from "./article";
import { ErrorBoundary } from "./error-boundary";
import { Meme } from "./meme";
import { Youtube } from "./youtube";
import { Playlist } from "./playlist";
import Image from "./image";
import { Link } from "./link";
import { Frame } from "./frame";
import { H1, H2, H3, H4, H5, H6, P, Ul, Ol, Li, BlockQuote } from "./typo";
import { HR } from "./hr";

const shortcodes = { Meme, Youtube, Playlist };

const defaults = {
  a: Link,
  img: Image,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: HR,
  blockquote: BlockQuote,
};

const ArticleController: React.FC<{ data: ArticleQuery }> = ({ data }) => {
  return (
    <MDXProvider components={{ ...defaults, ...shortcodes }}>
      <Frame>
        <ErrorBoundary>
          <Article meta={{ ...data.mdx.frontmatter, ...data.mdx.fields }}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Article>
        </ErrorBoundary>
      </Frame>
    </MDXProvider>
  );
};

export default ArticleController;

export const query = graphql`
  query ArticleQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        labels
        path
        recommendations {
          article {
            title
            subTitle
            description
            path
            date(fromNow: true, locale: "DE")
          }
          vote
        }
      }
      frontmatter {
        title
        subTitle
        description
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
    }
  }
`;

type ArticleQuery = {
  mdx: RawArticle;
};
