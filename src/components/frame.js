import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import { Header } from './header';

import { space, width, font, line, color } from '../style';

const FONT_IMPORT =
  'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&family=Raleway:ital,wght@0,300;0,700;1,300;1,700&display=swap';

const PageContainer = styled.div`
  margin: 0;
`;
const ContentContainer = styled.div`
  margin: ${space[3]} auto;
  max-width: ${width[4]};
  padding: ${space[1]};
`;

export const Frame = ({ children }) => {
  return (
    <PageContainer>
      <Global
        styles={css`
          @import url('${FONT_IMPORT}');
          html {
            font-size: 20px;
            font-family: ${font.body};
            font-weight: 300;
            color: ${color.neutral[1]};
            line-height: ${line.standard};
          }
          body {
            font-family: ${font.body};
            margin: 0;
            padding: 0;
          }
          strong {
            font-weight: 700;
          }
          em {
            font-style: italic;
          }
        `}
      />
      <Header />
      <ContentContainer>{children}</ContentContainer>
    </PageContainer>
  );
};
