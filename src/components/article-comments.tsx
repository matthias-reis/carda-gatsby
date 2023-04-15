import * as React from 'react';
import styled from '@emotion/styled';
import { DiscussionEmbed } from 'disqus-react';
import { Container } from './container';
import { H3 } from './typo';
import { color } from '../style';
import type { Article } from '../types';

const Section = styled.aside`
  background: ${color.green10};
  color: ${color.text10};
`;

const Comments: React.FC<{ meta: Article }> = ({ meta }) => <div />;
const Loading: React.FC = () => <h1>...</h1>;

export const ArticleComments: React.FC<{ meta: Article }> = ({ meta }) => {
  const [isComponentMounted, setIsComponentMounted] = React.useState(false);
  React.useEffect(() => setIsComponentMounted(true), []);
  return (
    <Section>
      <Container large>
        <H3>Kommentar hinterlassen</H3>
        {isComponentMounted ? <Comments meta={meta} /> : <Loading />}
      </Container>
    </Section>
  );
};
