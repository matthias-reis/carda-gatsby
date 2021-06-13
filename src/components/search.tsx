import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import { IconSearch } from './icons';
import { IconButton } from './button-icon';
import { HeaderSheet } from './header-sheet';
import { event } from './analytics';

import { color, space, width, fontSize, font } from '../style';

const fixSoftHyphens = (s?: string) =>
  (s || '').replace(/&shy;/g, String.fromCharCode(173));

const Hit = ({ hit }) => {
  console.log(hit.image);
  const isAd = hit.advertisement;
  const isAffiliate = hit.affiliate;
  const isAdOrAffiliate = isAd || isAffiliate;

  let adTeaser = '';
  if (isAd) {
    adTeaser = 'Werbung';
  }
  if (isAffiliate) {
    adTeaser = 'Affiliate-Links';
  }
  if (isAd && isAffiliate) {
    adTeaser = 'Werbung & Affiliate-Links';
  }

  return (
    <HitBox to={hit.path}>
      <HitImageContainer>
        <HitImage src={hit.image?.replace(/%/g, '%25')} />
      </HitImageContainer>
      <HitContent>
        <HitTitle>{fixSoftHyphens(hit.title)}</HitTitle>
        <HitSubTitle>{fixSoftHyphens(hit.subTitle)}</HitSubTitle>
        {hit.languageLink && (
          <HitLanguageHint>🇬🇧 English version available</HitLanguageHint>
        )}
        {isAdOrAffiliate && <MetaTeaser>{adTeaser}</MetaTeaser>}
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
        <StyledSearchBox
          translations={{ placeholder: 'Nach Artikeln suchen ...' }}
          autoFocus
        />
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
  border-bottom: 1px solid ${color.border30};
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
  color: ${color.text30};
  text-decoration: none;
  ${HitBox}:hover & {
    color: ${color.text20};
  }
`;

const HitTitle = styled.span`
  color: ${color.text20};
  display: block;
  font-weight: bold;
  ${HitBox}:hover & {
    color: ${color.text10};
  }
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
    background: ${color.overlay10};
    border: 1px solid ${color.border20};
    border-radius: ${space[0]};
  }

  & input[type='search'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${color.overlay10};
    background: none;
    color: ${color.text10};
    flex: 1 1 auto;
    border: 0;
    margin-left: ${space[0]};
    margin-right: ${space[1]};
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: ${fontSize[4]};
    font-family: ${font.body};

    &:focus {
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

    & svg {
      width: 0.8rem;
      height: 0.8rem;
      fill: ${color.text30};
    }
    &:focus,
    &:hover {
      outline: none;
    }
    &:focus svg,
    &:hover svg {
      fill: ${color.highlight50};
    }
  }
`;

const MetaTeaser = styled.div`
  text-align: right;
  font-size: ${fontSize[2]};
  color: ${color.text30};
  padding: ${space[0]};
`;
