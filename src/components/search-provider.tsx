import * as React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { event } from './analytics';

const searchClient = algoliasearch(
  'YASWLX3T8Y',
  '6b7bf1fc6265b3cc5836e63ec51b047f'
);
let currentQuery: string = '';
let hasTimeout = false;

const triggerEvent = (query: string) => {
  currentQuery = query;
  if (!hasTimeout) {
    hasTimeout = true;
    setTimeout(() => {
      hasTimeout = false;
      event('search/query', 'search', currentQuery);
    }, 1000);
  }
};

export const SearchProvider: React.FC = ({ children }) => {
  return (
    <InstantSearch
      refresh
      indexName="Pages"
      searchClient={searchClient}
      onSearchStateChange={(searchState: { query: string }) => {
        triggerEvent(searchState.query);
      }}
    >
      {children}
    </InstantSearch>
  );
};
