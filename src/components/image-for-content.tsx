import * as React from 'react';
import styled from '@emotion/styled';

import { Caption } from './caption';
import { space, width, breakpoints } from '../style';
import { Image as ImagineImage } from './image';

const Image: React.FC<ImageProps> = ({ alt, src, title }) => {
  const [altText, type] = (alt || '').split(' | ');
  const containers = {
    large: LargeImageContainer,
    medium: MediumImageContainer,
    small: SmallImageContainer,
  };
  const sizes = {
    large: 34,
    medium: 21,
    small: 13,
  };
  const Container = containers[type || 'medium'];

  return (
    <Container>
      <ImagineImage alt={altText} src={src} size={sizes[type || 'medium']} />
      {title && <Caption>{title.replace(/\\/g, '')}</Caption>}
    </Container>
  );
};

export default Image;

type ImageProps = {
  alt: string;
  src: string;
  title: string;
};

const SmallImageContainer = styled.span`
  display: block;
  width: ${width[2]};
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

const MediumImageContainer = styled.span`
  display: block;
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

const LargeImageContainer = styled.span`
  display: block;
  margin: 0 0 ${space[1]} 0;
  & span {
    display: block;
  }
`;
