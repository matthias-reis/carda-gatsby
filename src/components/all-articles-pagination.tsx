import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { color, fontSize, space } from '../style';
import { IconChevronLeft, IconChevronRight } from './icons';

const PaginationBox = styled.ul`
  list-style: none;
  margin: ${space[3]} 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(Link)`
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  border: 1px solid ${color.border30};
  padding: ${space[0]} ${space[2]};
  border-radius: ${space[0]};
  height: 32px;
  color: ${color.text20};

  &:hover {
    background: ${color.overlay30};
    border-color: ${color.text20};
    color: ${color.text20};
  }
`;

const Numbering = styled.li`
  margin: 0 ${space[3]};
  font-size: ${fontSize[4]};
`;

type AllArticlesPaginationProps = {
  pageNumber: number;
  maxPageNumber: number;
};

export const AllArticlesPagination: React.FC<AllArticlesPaginationProps> = ({
  pageNumber,
  maxPageNumber,
}) => {
  return (
    <PaginationBox>
      {pageNumber === 2 ? (
        <li>
          <Button to="/">
            <IconChevronLeft />
          </Button>
        </li>
      ) : (
        <li>
          <Button to={`/all-articles/${pageNumber - 1}`}>
            <IconChevronLeft />
          </Button>
        </li>
      )}
      <Numbering>
        {pageNumber} / {maxPageNumber}
      </Numbering>
      {pageNumber < maxPageNumber && (
        <li>
          <Button to={`/all-articles/${pageNumber + 1}`}>
            <IconChevronRight />
          </Button>
        </li>
      )}
    </PaginationBox>
  );
};
