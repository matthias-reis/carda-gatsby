import * as React from 'react';
import styled from '@emotion/styled';

import Link from 'gatsby-link';
import { Logo } from './logo';
import { MainNav } from './nav-main';
import { Search } from './search';
import { event } from './analytics';

import { space, color } from '../style';

export const Header: React.FC = () => (
  <Wrapper>
    <HomeLink to="/" onClick={() => event('link/click', 'link', 'header/home')}>
      <Logo />
      <h1>cardamonchai.com</h1>
    </HomeLink>
    <RightSide>
      <MainNav />
      <Search />
    </RightSide>
  </Wrapper>
);

const Wrapper = styled.header`
  box-shadow: 0 17px 30px -25px ${color.shadow};
  border-bottom: 2px solid ${color.border10};
  height: 4rem;
  margin: 0 ${space[1]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
`;

const HomeLink = styled(Link)`
  padding: ${space[0]};
  h1 {
    display: none;
    margin: 0;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;
