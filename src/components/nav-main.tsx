import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { useStaticQuery, graphql } from 'gatsby';

import { color, space, font, fontSize, width } from '../style';

import { HeaderSheet } from './header-sheet';
import { IconBurger } from './icons';
import { IconButton } from './button-icon';

const BREAKPOINT = 900;

type NavItem = {
  url: string;
  label: string;
};

type MainNavItem = NavItem & { children: NavItem[] };

type MainNavData = {
  configYaml: {
    mainNavigation: MainNavItem[];
  };
};

export const MainNav: React.FC = () => {
  const data: MainNavData = useStaticQuery(graphql`
    query MainNav {
      configYaml {
        mainNavigation {
          url
          label
          children {
            url
            label
          }
        }
      }
    }
  `);
  const nav = data.configYaml.mainNavigation;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <DesktopNav>
        {nav.map((item: MainNavItem) => (
          <Item key={item.url}>
            <Link to={item.url}>{item.label}</Link>
            {item.children && (
              <Children>
                {item.children.map((child: NavItem) => (
                  <Child key={child.url}>
                    <Link to={child.url}>{child.label}</Link>
                  </Child>
                ))}
              </Children>
            )}
          </Item>
        ))}
      </DesktopNav>
      <MobileNavTrigger Icon={IconBurger} onClick={handleToggle} />
      <HeaderSheet isVisible={isOpen} heightInVh={80}>
        <MobileNav>
          {nav.map((item: MainNavItem) => (
            <MobileItem key={item.url}>
              <a href={item.url}>{item.label}</a>
              {item.children && (
                <MobileChildren>
                  {item.children.map((child: NavItem) => (
                    <MobileChild key={child.url}>
                      <a href={child.url}>{child.label}</a>
                    </MobileChild>
                  ))}
                </MobileChildren>
              )}
            </MobileItem>
          ))}
        </MobileNav>
      </HeaderSheet>
    </React.Fragment>
  );
};

const Children = styled.ul`
  display: none;
  background: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 3rem;
  right: 0;
  z-index: 1;
  box-shadow: 0 12px 12px -6px #0004;
`;

const MobileChildren = styled.ul`
  background: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1;
`;

const DesktopNav = styled.ul`
  display: flex;
  align-items: center;
  height: 4rem;
  list-style: none;
  margin: 0;
  font-family: ${font.title};
  font-size: ${fontSize[4]};
  font-weight: 300;

  @media (max-width: ${BREAKPOINT - 1}px) {
    display: none;
  }
`;

const MobileNavTrigger = styled(IconButton)`
  @media (min-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ${font.title};
  font-size: ${fontSize[3]};
  font-weight: 300;
`;
const Item = styled.li`
  position: relative;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 ${space[1]};

  &:hover ${Children} {
    display: block;
  }

  & a {
    text-decoration: none;
    color: ${color.neutral[3]};

    &:hover {
      text-decoration: underline;
      color: ${color.neutral[1]};
    }
  }
`;

const MobileItem = styled.li`
  padding: 0 ${space[1]};
  display: inline-block;
  width: 160px;
  line-height: 1.1;
  margin-bottom: ${space[3]};

  & a {
    text-decoration: none;
    color: ${color.neutral[3]};

    &:hover {
      text-decoration: underline;
      color: ${color.neutral[1]};
    }
  }
`;

const Child = styled.li`
  margin: ${space[0]} ${space[1]};
  font-size: ${fontSize[2]};
  text-align: right;
  width: ${width[1]};
`;

const MobileChild = styled.li`
  margin: ${space[1]} ${space[0]};
  font-size: ${fontSize[2]};
  width: ${width[1]};
`;
