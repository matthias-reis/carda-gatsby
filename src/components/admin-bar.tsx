import styled from '@emotion/styled';
import * as React from 'react';
import moment from 'moment';
import { useStaticQuery, graphql } from 'gatsby';

import { isPreview } from '../is-production';
import { color, fontSize, space } from '../style';
import { IconEdit, IconNew } from './icons';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${color.highlight05};
  border-top: 2px solid #000;
  box-shadow: 0 0 20px #0008;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: ${space[1]};
  padding: ${space[0]} ${space[1]};
`;

const Item = styled.a`
  border: 2px solid transparent;
  cursor: pointer;
  color: #fff8;
  text-decoration: none;
  font-size: ${fontSize[2]};
  display: flex;
  align-items: center;
  padding: 0 ${space[2]};
  border-radius: ${space[1]};

  & svg {
    margin-right: ${space[0]};
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #fff;
  }
`;

const Info = styled.a`
  display: block;
  position: absolute;
  right: ${space[3]};
  bottom: ${space[0]};
  font-size: ${fontSize[2]};
  color: #fff4;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

export const AdminBar: React.FC = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        buildTime
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const handleDeploymentClick = () => {
    // curl -X POST -d {} https://api.netlify.com/build_hooks/60a93ed507b42b7a919dbc80
    const webhookUrl =
      'https://api.netlify.com/build_hooks/60a93ed507b42b7a919dbc80';

    globalThis.fetch(webhookUrl, { method: 'POST', mode: 'no-cors' });
  };

  return (
    isPreview && (
      <Container>
        <Item
          href={`${data.site.siteMetadata.siteUrl}/admin/#/collections/oldArticle/new`}
          target="_blank"
        >
          <IconNew /> Neuer Beitrag
        </Item>
        <Item href="" target="_blank">
          <IconEdit />
          Beitrag bearbeiten
        </Item>
        <Item onClick={handleDeploymentClick}>☠️ Deployment</Item>
        <Info href="https://www.gatsbyjs.com/dashboard/19505d43-7169-4abd-b5f2-068de380c0df/sites/6c68703c-0aec-403b-acf5-e2b810e68344/deploys">
          Version von {moment(data.site.buildTime).fromNow()}
        </Info>
      </Container>
    )
  );
};
