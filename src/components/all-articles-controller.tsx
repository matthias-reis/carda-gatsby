import * as React from 'react';
import { graphql } from 'gatsby';
import { Article, CompactArticle, ListQuery } from '../types';
import { Frame } from './frame';
import { ErrorBoundary } from './error-boundary';
import ListPage from './list-page';
import { AllArticlesPagination } from './all-articles-pagination';
import { FooterNavigation } from './footer-navigation';

const AllArticlesController: React.FC<{
  pageContext: {
    articles: CompactArticle[];
    pageNumber: number;
    maxPageNumber: number;
  };
}> = ({ pageContext: { articles, pageNumber, maxPageNumber } }) => {
  return (
    <Frame>
      <ErrorBoundary>
        <ListPage
          articles={articles}
          topic="Archiv"
          title={`Alle Artikel - Seite ${pageNumber}/${maxPageNumber}`}
          path={`/all-articles/${pageNumber}`}
        />
        <AllArticlesPagination
          pageNumber={pageNumber}
          maxPageNumber={maxPageNumber}
        />
        <FooterNavigation />
      </ErrorBoundary>
    </Frame>
  );
};

export default AllArticlesController;
