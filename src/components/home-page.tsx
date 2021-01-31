import * as React from 'react';
import styled from '@emotion/styled';

import { CompactArticle } from '../types';
import { space } from '../style';

import { HomeLogo } from './home-logo';
import { ArticleList } from './article-list';
import { HomePagination } from './home-pagination';
import { FooterNavigation } from './footer-navigation';

const ContentSection = styled.div`
  margin: 0 ${space[4]};
  @media (max-width: 899px) {
    margin: 0 ${space[1]};
  }
`;

const Hd = styled.div`
  margin: ${space[4]} 0;
  text-align: center;
`;

type NextContent = {
  articles: CompactArticle[];
  pageNumber: number;
  maxPages: number;
};

const fetchNextContent = async (nextPageId: number) => {
  const url = `/homepage-data/homepage-pagination-${nextPageId}.json`;
  console.log(`INFINITE fetching from <${url}>`);
  const res = await fetch(url);
  const data: NextContent = await res.json();

  return data;
};

export const HomePage: React.FC<{
  articles: CompactArticle[];
}> = ({ articles }) => {
  const [availableArticles, setAvailableArticles] = React.useState<
    CompactArticle[]
  >(articles);

  const [nextPage, setNextPage] = React.useState<number>(0);
  const [maxPages, setMaxPages] = React.useState<number>(100);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  console.log('INFINITE render', nextPage);

  React.useEffect(() => {
    (async () => {
      console.log('INFINITE handle load', nextPage);
      if (nextPage > 0 && nextPage < maxPages) {
        setIsLoading(true);

        const nextContent = await fetchNextContent(nextPage);
        setMaxPages(nextContent.maxPages);
        setAvailableArticles([...availableArticles, ...nextContent.articles]);
        setIsLoading(false);
      }
    })();
  }, [nextPage, maxPages]);

  return (
    <div>
      <ContentSection>
        <Hd>
          <HomeLogo />
        </Hd>
        <ArticleList articles={availableArticles.slice(0, 3)} />
      </ContentSection>
      <h1>Splitter</h1>
      <FooterNavigation />
      <ContentSection>
        <ArticleList articles={availableArticles.slice(3)} />
        <HomePagination
          isLoading={isLoading}
          onShouldLoad={() => setNextPage((nextPage) => nextPage + 1)}
        />
      </ContentSection>
    </div>
  );
};
