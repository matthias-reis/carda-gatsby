import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { Category, CompactArticle } from '../types';
import { color, fontSize, space } from '../style';

import { Title, Subtitle } from './typo';
import { ArticleList } from './article-list';
import { PageMeta } from './page-meta';
import { Container } from './container';
import { P } from './typo';
import { AdminBar } from './admin-bar';
import { IconChevronRight as UnstyledIconChevronRight } from './icons';

const ListPage: React.FC<{
  articles: CompactArticle[];
  topic: string;
  title: string;
  description?: string;
  path: string;
  childItems?: Record<string, Category>;
  parentItem?: Category;
}> = ({
  articles,
  topic,
  title,
  description,
  path,
  childItems,
  parentItem,
}) => {
  return (
    <div>
      <PageMeta
        meta={{
          fields: {
            labels: [],
            path: '/',
            type: 'page',
            recommendations: [],
          },
          frontmatter: {
            title: `${topic}${title}`,
            subTitle: 'Sounds Vegan',
            description,
            type: '',
            typeName: 'Homepage',
            date: new Date().toString(),
          },
        }}
        path={path}
      />
      <ContentSection>
        <Hd>
          <Breadcrumb>
            <span>
              <Link to="/">Home</Link>
            </span>
            <IconChevronRight />
            {parentItem && (
              <>
                <span>
                  <Link to={`/tag/${parentItem.slug}`}>{parentItem.title}</Link>
                </span>
                <IconChevronRight />
              </>
            )}
            <span>{title}</span>
          </Breadcrumb>
          <Title>
            {topic} «<strong>{title}</strong>»
          </Title>
          <Subtitle>{articles.length} Artikel</Subtitle>
        </Hd>
        <Container>{description && <P>{description}</P>}</Container>
        {childItems && Object.values(childItems).length && (
          <ChildTopics>
            {Object.values(childItems).map((childItem) => (
              <ChildTopic key={childItem.slug}>
                <Link to={`/tag/${childItem.slug}`}>{childItem.title}</Link>
              </ChildTopic>
            ))}
          </ChildTopics>
        )}
        <ArticleList articles={articles} content={`list/${topic}`} />
      </ContentSection>
      <AdminBar />
    </div>
  );
};

const IconChevronRight = styled(UnstyledIconChevronRight)`
  position: relative;
  bottom: -3px;
  padding: 0 ${space[0]};
`;

const ChildTopics = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: ${space[1]};
  align-items: stretch;
  padding: 0;
  margin-bottom: ${space[4]};
`;
const ChildTopic = styled.li`
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: ${space[2]};
    border: 1px solid ${color.border20};
    border-radius: ${space[0]};
    height: 100%;
    box-sizing: border-box;
    color: ${color.text20};
    text-decoration: none;
    font-weight: bold;
  }
  & a:hover {
    background: ${color.overlay30};
    color: ${color.text50};
  }
`;

const ContentSection = styled.div`
  margin: 0 ${space[4]};
  @media (max-width: 899px) {
    margin: 0 ${space[1]};
  }
`;

const Hd = styled.div`
  margin: ${space[4]} 0 ${space[3]} 0;
`;

const Breadcrumb = styled.nav`
  text-align: center;
  font-size: ${fontSize[2]};
  color: ${color.text30};
  & a {
    color: ${color.text20};
  }
  & svg {
    width: ${fontSize[2]};
    height: ${fontSize[2]};
  }
`;

export default ListPage;
