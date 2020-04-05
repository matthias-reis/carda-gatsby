import React from 'react';
import { graphql } from 'gatsby';

import { Article } from './article';

const PageContainer = ({ data }) => {
  const meta = {
    ...data.markdownRemark.frontmatter,
    timeToRead: data.markdownRemark.timeToRead,
  };
  return <Article md={data.markdownRemark.rawMarkdownBody} meta={meta} />;
};

export default PageContainer;

export const query = graphql`
  query PageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      rawMarkdownBody
      frontmatter {
        description
        title
      }
    }
  }
`;
