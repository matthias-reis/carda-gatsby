import * as React from 'react';
import styled from '@emotion/styled';
import { useStaticQuery, graphql, Link } from 'gatsby';

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
          external
          children {
            url
            label
            external
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
            <NavLink {...item} />
            {item.children && (
              <Children>
                {item.children.map((child: NavItem) => (
                  <Child key={child.url}>
                    <NavLink {...child} />
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
              <NavLink {...item} />
              {item.children && (
                <MobileChildren>
                  {item.children.map((child: NavItem) => (
                    <MobileChild key={child.url}>
                      <NavLink {...child} />
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

const NavLink: React.FC<NavItem> = ({ external, url, label }) => {
  if (external) {
    return <a href={url}>{label}</a>;
  } else {
    return <Link to={url}>{label}</Link>;
  }
};

const Children = styled.ul`
  display: none;
  background: ${color.background10};
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 3rem;
  right: 0;
  z-index: 20;
  box-shadow: 0 12px 12px -6px ${color.shadow};
`;

const MobileChildren = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 2;
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
  margin: 0;
  padding: ${space[2]} 0;
  flex-wrap: wrap;
  list-style: none;
  font-family: ${font.title};
  font-size: ${fontSize[3]};
  font-weight: 300;
`;
const Item = styled.li`
  position: relative;
  /* font compensation */
  bottom: -5px;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 ${space[2]} 0 ${space[1]};

  &:hover ${Children} {
    display: block;
  }

  & a {
    text-decoration: none;
    color: ${color.text20};

    &:hover {
      text-decoration: underline;
      color: ${color.text10};
      z-index: 1;
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
    color: ${color.text20};

    &:hover {
      text-decoration: underline;
      color: ${color.text10};
    }
  }
`;

const Child = styled.li`
  margin: ${space[0]} ${space[1]};
  font-size: ${fontSize[2]};
  text-align: right;
  min-width: ${width[1]};
  white-space: nowrap;
`;

const MobileChild = styled.li`
  margin: ${space[1]} ${space[0]};
  font-size: ${fontSize[2]};
  width: ${width[1]};

  & a {
    color: ${color.text30};

    &:hover {
      color: ${color.text20};
    }
  }
`;
