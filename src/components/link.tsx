import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
import { color, space } from '../style';
import { IconExternalLink } from './icons';

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
const StyledExternalLink = styled.a`
  ${link}
  & svg {
    margin-left: ${space[0]};
    width: 0.65em;
    height: 0.65em;
    position: relative;
    top: -${space[0]};
  }
`;

const ExternalLink: React.FC = ({ children, ...props }) => (
  <StyledExternalLink {...props}>
    {children}
    <IconExternalLink />
  </StyledExternalLink>
);

export const Link: React.FC<{ href: string }> = ({ href, children }) => {
  if ((href || '').startsWith('http')) {
    return (
      <ExternalLink
        href={href}
        target="_blank"
        rel="noreferrer, noopener, nofollow"
      >
        {children}
      </ExternalLink>
    );
  } else {
    return <InternalLink to={href}>{children}</InternalLink>;
  }
};
