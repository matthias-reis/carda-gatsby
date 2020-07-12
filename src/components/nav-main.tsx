import * as React from "react";
import styled from "@emotion/styled";

import Link from "gatsby-link";
import { useStaticQuery, graphql } from "gatsby";

import { color, space, font, fontSize, width } from "../style";

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

const Nav = styled.ul`
  display: flex;
  align-items: center;
  height: 4rem;
  list-style: none;
  margin: 0;
  font-family: ${font.title};
  font-size: ${fontSize[4]};
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

const Child = styled.li`
  margin: ${space[0]} ${space[1]};
  font-size: ${fontSize[2]};
  text-align: right;
  width: ${width[1]};
`;

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

  return (
    <Nav>
      {nav.map((item: MainNavItem) => (
        <Item key={item.url}>
          <a href={item.url}>{item.label}</a>
          {item.children && (
            <Children>
              {item.children.map((child: NavItem) => (
                <Child key={child.url}>
                  <a href={child.url}>{child.label}</a>
                </Child>
              ))}
            </Children>
          )}
        </Item>
      ))}
    </Nav>
  );
};
