import * as React from 'react';
import styled from '@emotion/styled';

import { CompactArticle } from '../types';
import { space } from '../style';

import { HomeLogo } from './home-logo';
import { ArticleList } from './article-list';
import { HomePagination } from './home-pagination';
import { FooterNavigation } from './footer-navigation';
import { FooterContent } from './footer-content';
import { PageMeta } from './page-meta';
import { AdminBar } from './admin-bar';
import { event } from './analytics';

type NextContent = {
  articles: CompactArticle[];
  pageNumber: number;
  maxPages: number;
};

const fetchNextContent = async (nextPageId: number) => {
  const url = `/homepage-data/homepage-pagination-${nextPageId}.json`;
  const res = await fetch(url);
  const data: NextContent = await res.json();

  return data;
};

export const HomePage: React.FC<{
  articles: CompactArticle[];
}> = ({ articles }) => {
  const [availableArticles, setAvailableArticles] =
    React.useState<CompactArticle[]>(articles);

  const [nextPage, setNextPage] = React.useState<number>(0);
  const [maxPages, setMaxPages] = React.useState<number>(100);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      if (nextPage > 0 && nextPage < maxPages) {
        setIsLoading(true);

        const nextContent = await fetchNextContent(nextPage);
        setMaxPages(nextContent.maxPages);
        setAvailableArticles([...availableArticles, ...nextContent.articles]);
        setTimeout(() => setIsLoading(false), 1000);
      }
    })();
  }, [nextPage, maxPages]);

  return (
    <div>
      <PageMeta
        meta={{
          fields: {
            labels: [],
            path: '/',
            type: 'page',
            recommendations: [],
          },
          frontmatter: {
            title: "Rock 'n' Roll vegan – Musik und Veganismus",
            subTitle: "Rock 'n' Roll vegan",
            description:
              "Rock 'n' Roll vegan berichtet regelmäßig über Themen wie Veganismus, Tierrechte, Nachhaltigkeit und Klimaschutz. Obendrauf gibt's Interviews und Reviews – vor allem aus der Post-Rock Ecke.",
            type: '',
            typeName: 'Homepage',
            date: new Date().toString(),
            language: 'de',
          },
        }}
        path="/"
      />
      <ContentSection>
        <Hd>
          <H1>Rock 'n' Roll vegan</H1>
          <HomeLogo width={600} />
        </Hd>
        <ArticleList
          articles={availableArticles.slice(0, 3)}
          content="home/top3"
          isLarge
        />
      </ContentSection>
      <FooterContent />
      <FooterNavigation />
      <ContentSection>
        <ArticleList
          articles={availableArticles.slice(3)}
          content="home/next"
        />
        {!isLoading && (
          <HomePagination
            isLoading={isLoading}
            onShouldLoad={() => {
              event('pagination/next-chunk', 'pagination');
              setNextPage((nextPage) => nextPage + 1);
            }}
          />
        )}
      </ContentSection>
      <AdminBar />
    </div>
  );
};

const ContentSection = styled.div`
  margin: -${space[3]} ${space[4]} ${space[4]} ${space[4]};
  @media (max-width: 899px) {
    margin: -${space[3]} ${space[1]} ${space[1]} ${space[1]};
  }
`;

const Hd = styled.div`
  margin: ${space[0]} 0 ${space[3]} 0;
  text-align: center;
  & > svg {
    max-width: 100%;
  }
`;

const H1 = styled.h1`
  display: none;
`;
