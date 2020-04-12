import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { Title, Subtitle } from './headline';
import { space } from '../style';

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;

export const Article = ({ children, meta }) => {
  return (
    <>
      <Link to="/">〈 Homepage</Link>
      <Title>{meta.title}</Title>
      {meta.subtitle && <Subtitle>{meta.subtitle}</Subtitle>}
      <ImageContainer>
        {meta.image && <Image fluid={meta.image.childImageSharp.fluid} />}
      </ImageContainer>
      <div>{children}</div>
    </>
  );
};
