import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { Title, Subtitle } from './headline';
import { getPath } from '../gatsby/slugify';
import { space } from '../style';

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

export const Article = ({ children, meta }) => {
  return (
    <>
      <p>
        <Link to="/">〈 Homepage</Link>
      </p>
      <p>
        <a href={`https://cardamonchai.com${meta.link}`}>〉Cardamonchai now</a>
      </p>
      <Title>{meta.title}</Title>
      {meta.subTitle && <Subtitle>{meta.subTitle}</Subtitle>}
      <ImageContainer>
        {meta.image && <Image fluid={meta.image.childImageSharp.fluid} />}
      </ImageContainer>
      <div>{children}</div>
      <nav>
        {meta.labels.map((label) => {
          const destination = getPath(label);
          return <Label to={destination}>{label}</Label>;
        })}
      </nav>
    </>
  );
};
