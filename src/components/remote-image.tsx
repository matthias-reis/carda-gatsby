import * as React from 'react';
import styled from '@emotion/styled';
import { breakpoints, fontSize, space, width } from '../style';
import { CardaImage } from './carda-image';
import { size } from 'lodash';

export const RemoteImage: React.FC<{
  alt: string;
  size?: 'full' | 'large' | 'medium';
  title?: string;
  loadingUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
}> = ({ alt, title, size, loadingUrl, largeUrl, mediumUrl }) => {
  const isLarge = size === 'large' || size === 'full';
  const Container = isLarge ? FixedImageContainer : FloatingImageContainer;
  const src = isLarge ? largeUrl : mediumUrl;
  return (
    <Container>
      <CardaImage alt={alt} src={src || ''} loading={loadingUrl} />
      {title && <Caption>{title}</Caption>}
    </Container>
  );
};

const Caption = styled.span`
  font-size: ${fontSize[2]};
  font-style: italic;
  text-align: right;
`;

const FloatingImageContainer = styled.div`
  width: ${width[3]};
  float: right;
  margin: 0 -${space[5]} ${space[1]} ${space[1]};
  & span {
    display: block;
  }

  @media (max-width: ${breakpoints.layoutFold}) {
    margin: 0 0 ${space[1]} ${space[1]};
  }

  @media (max-width: ${breakpoints.smallFold}) {
    width: 100%;
    margin: ${space[1]} 0;
  }
`;

const FixedImageContainer = styled.div`
  margin: 0 0 ${space[1]} 0;
  & span {
    display: block;
  }
`;
