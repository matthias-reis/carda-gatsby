import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
import { color, space } from '../style';
import { IconExternalLink } from './icons';
import { event } from './analytics';

const link = `
  position: relative;
  color: ${color.green40};
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

const ExternalLink: React.FC<{
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler;
  rel?: string;
}> = ({ children, href, ...props }) => (
  <StyledExternalLink href={href} {...props}>
    {children}
    <IconExternalLink />
  </StyledExternalLink>
);

export const Link: React.FC<{ href: string; title?: string }> = ({
  href,
  children,
  title,
}) => {
  // title notation is being used as a hint for the links referrer status
  const rel =
    title === 'follow' ? 'noopener' : 'noreferrer, noopener, nofollow';
  if (
    (href || '').startsWith('http') ||
    (href || '').startsWith('mailto') ||
    (href || '').indexOf('.pdf') > -1
  ) {
    return (
      <ExternalLink
        href={href}
        target="_blank"
        onClick={() => event('link/click/external', 'link', href)}
        rel={rel}
      >
        {children}
      </ExternalLink>
    );
  } else {
    return (
      <InternalLink
        to={href}
        onClick={() => event('link/click/internal', 'link', href)}
      >
        {children}
      </InternalLink>
    );
  }
};
