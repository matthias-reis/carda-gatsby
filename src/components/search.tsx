import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import { IconSearch } from './icons';
import { IconButton } from './button-icon';
import { HeaderSheet } from './header-sheet';
import { event } from './analytics';

import { color, space, width, fontSize, font } from '../style';

const Hit = ({ hit }) => {
  const hasEnglishVersion = !!(hit.links?.en ?? false);
  return (
    <HitBox to={hit.path}>
      <HitImageContainer>
        <HitImage src={hit.image} />
      </HitImageContainer>
      <HitContent>
        <HitTitle>{hit.title}</HitTitle>
        <HitSubTitle>{hit.subTitle}</HitSubTitle>
        {hasEnglishVersion && (
          <HitLanguageHint>🇬🇧 English version available</HitLanguageHint>
        )}
      </HitContent>
    </HitBox>
  );
};

export const Search: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
    event('search/opened', 'search');
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleToggle} Icon={IconSearch} />
      <HeaderSheet isVisible={isVisible} heightInVh={50}>
        <StyledSearchBox autofocus />
        <StyledHits hitComponent={Hit} />
      </HeaderSheet>
    </React.Fragment>
  );
};

const HitLanguageHint = styled.div`
  font-size: ${fontSize[1]};
  margin-top: ${space[1]};
`;

const StyledHits = styled(Hits)`
  ul {
    list-style: none;
    padding: 0 ${space[1]};
  }
`;

const HitBox = styled(Link)`
  border-bottom: 1px solid ${color.border[1]};
  display: flex;
  width: ${width[4]};
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: ${space[1]} 0;
  text-decoration: none;
  font-size: ${fontSize[2]};
`;

const HitImageContainer = styled.span`
  width: 100px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: ${space[1]};
`;

const HitImage = styled.img`
  width: 150px;
  flex: 0 0 auto;
`;

const HitContent = styled.span`
  flex: 1 1 auto;
  color: ${color.neutral[1]};
  text-decoration: none;
`;

const HitTitle = styled.span`
  display: block;
  font-weight: bold;
`;
const HitSubTitle = styled.span`
  display: block;
`;

const StyledSearchBox = styled(SearchBox)`
  max-width: 100%;
  padding: 0 ${space[1]};
  & form {
    display: flex;
    margin: 0 auto;
    width: ${width[4]};
    max-width: 100%;
    justify-content: space-between;
    margin-bottom: ${space[1]};
    border: 1px solid ${color.border[1]};
    border-radius: ${space[0]};
  }

  & input[type='search'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    flex: 1 1 auto;
    border: 0;
    margin-right: ${space[1]};
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: ${fontSize[4]};
    font-family: ${font.body};
    color: ${color.neutral[2]};

    &:focus {
      border-color: ${color.warm[1]};
      outline: none;
    }

    &::-ms-clear,
    &::-ms-reveal,
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
      width: 0;
      height: 0;
    }
  }

  & button[type='submit'],
  & button[type='reset'] {
    flex: 0 0 auto;
    border: 0;
    background: transparent;
    color: ${color.neutral[2]};

    & svg {
      width: 0.8rem;
      height: 0.8rem;
    }
    &:focus,
    &:hover {
      color: ${color.warm[1]};
      outline: none;
    }
  }
`;
