import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { Link } from './link';
import { Interactions } from './interactions';
import { Title, Subtitle } from './typo';
import { HR } from './hr';
import { Container } from './container';

import { getPath } from '../gatsby/slugify';
import { space, color, width } from '../style';
import { Article as ArticleMeta } from '../types';

const ArticleFooter = styled.div`
  margin-top: ${space[4]};
`;

const InteractionDetails = styled.aside`
  background: ${color.cold[3]};
`;

const CrossLinkSection = styled.nav`
  background: ${color.neutral[5]};
`;

const FooterNavigation = styled.footer`
  background: ${color.neutral[2]};
`;

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

const ArticleContainer = Container.withComponent('article');

export const Article: React.FC<ArticleProps> = ({ children, meta }) => {
  return (
    <div>
      <ArticleContainer>
        <Interactions meta={meta} />
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
            {meta.labels.map((label: string) => {
              const destination = getPath(label);
              return <Label href={destination}>{label}</Label>;
            })}
          </nav>
        )}
      </ArticleContainer>
      <ArticleFooter>
        <InteractionDetails>
          <Container large>Interaction Details</Container>
        </InteractionDetails>

        <CrossLinkSection>
          <Container large>Crosslink Section</Container>
        </CrossLinkSection>

        <FooterNavigation>
          <Container large>FooterNavigation</Container>
        </FooterNavigation>
      </ArticleFooter>
    </div>
  );
};

type ArticleProps = {
  meta: ArticleMeta;
};
