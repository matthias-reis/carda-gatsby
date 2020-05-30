import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { Link } from './link';
import { Title, Subtitle } from './typo';
import { HR } from './hr';

import { getPath } from '../gatsby/slugify';
import { space, color } from '../style';

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;

const Label = styled(Link)`
  display: inline-block;
  border: 1px solid blue;
  border-radius: 3px;
  padding: 0 4px;
  margin: 0 4px 4px 0;
  color: black;
  text-decoration: none;
`;

const Meta = styled.p`
  margin: 0 0 ${space[2]} 0;
  color: ${color.neutral[3]};
  text-align: center;
`;

const CurrentLink = styled.a`
  color: ${color.cold[0]};
`;

export const Article = ({ children, meta }) => {
  return (
    <>
      <Meta>
        Beitrag vom 21.12.2022 ·{' '}
        <CurrentLink href={`https://cardamonchai.com${meta.path}`}>
          jetzt
        </CurrentLink>
      </Meta>
      <HR />
      <Title>{meta.title}</Title>
      {meta.subTitle && <Subtitle>{meta.subTitle}</Subtitle>}
      <ImageContainer>
        {meta.image && <Image fluid={meta.image.childImageSharp.fluid} />}
      </ImageContainer>
      <div>{children}</div>
      {meta.labels && (
        <nav>
          {meta.labels.map((label) => {
            const destination = getPath(label);
            return <Label to={destination}>{label}</Label>;
          })}
        </nav>
      )}
    </>
  );
};
