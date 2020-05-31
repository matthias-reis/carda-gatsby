import * as React from 'react';
import styled from '@emotion/styled';

import Link from 'gatsby-link';
import { Logo } from './logo';
import { SearchIcon } from './search-icon';

import { color, space, font, fontSize } from '../style';

const Wrapper = styled.header`
  box-shadow: 0 13px 30px -25px #0004;
  height: 4rem;
  margin: 0 ${space[1]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HomeLink = styled(Link)`
  padding: ${space[0]};
  h1 {
    display: none;
    margin: 0;
  }
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  height: 4rem;
  list-style: none;
  margin: 0;
  font-family: ${font.title};
  font-size: ${fontSize[4]};
  font-weight: 300;
  color: ${color.neutral[3]};
`;

const Item = styled.li`
  padding: 0 ${space[1]};
  margin: 0;
`;

const Icon = styled(SearchIcon)`
  margin-top: 0.5rem;
`;

export const Header: React.FC = () => (
  <Wrapper>
    <HomeLink to="/">
      <Logo />
      <h1>cardamonchai.com</h1>
    </HomeLink>
    <Nav>
      <Item>Buch kaufen</Item>
      <Item>Rock ’n‘ Roll</Item>
      <Item>Vegan</Item>
      <Item>Gesellschaft</Item>
      <Item>Unterwegs</Item>
      <Item>
        <Icon />
      </Item>
    </Nav>
  </Wrapper>
);
