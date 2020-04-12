import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';

const link = `
  display: inline-block;
  position: relative;
  color: tomato;
`;
const InternalLink = styled(GatsbyLink)`
  ${link}
`;
const ExternalLink = styled.a`
  ${link}
  margin-right: 1em;
  &:after {
    content: '🌐';
    position: absolute;
    font-size: 80%;
    right: -1em;
    top: -0.3em;
  }
`;

export const Link = ({ href, children }) => {
  if (href.startsWith('http')) {
    return (
      <ExternalLink
        href={href}
        target="_blank"
        rel="noreferrer, noopener, nofollow">
        {children}
      </ExternalLink>
    );
  } else {
    return <InternalLink to={href}>{children}</InternalLink>;
  }
};
