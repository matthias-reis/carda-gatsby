import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
import { color } from '../style';

const link = `
  position: relative;
  color: ${color.cold[0]};
  text-decoration-style: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
`;
const InternalLink = styled(GatsbyLink)`
  ${link}
`;
const ExternalLink = styled.a`
  ${link}
  margin-right: 1em;
  &:after {
    content: '⬆';
    position: absolute;
    font-size: 60%;
    right: -1em;
    top: -0.3em;
  }
`;

export const Link: React.FC<{ href: string }> = ({ href, children }) => {
  if ((href || '').startsWith('http')) {
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
