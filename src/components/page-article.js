import React from 'react';
import { graphql } from 'gatsby';

import { Article } from './article';

const BlogPost = ({ data }) => {
  const meta = {
    ...data.markdownRemark.frontmatter,
    timeToRead: data.markdownRemark.timeToRead,
  };
  return <Article md={data.markdownRemark.rawMarkdownBody} meta={meta} />;
};

export default BlogPost;

export const query = graphql`
  query ArticleQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      rawMarkdownBody
      wordCount {
        paragraphs
        sentences
        words
      }
      timeToRead
      frontmatter {
        relativeDate: date(fromNow: true)
        absolueDate: date
        description
      }
    }
  }
`;
