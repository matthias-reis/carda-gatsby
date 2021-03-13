import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import { Header } from './header';
import { Analytics } from './analytics';
import { SearchProvider } from './search-provider';

import { space, font, line, color } from '../style';

// const FONT_IMPORT =
//   'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&family=Raleway:ital,wght@0,300;0,700;1,300;1,700&display=swap';

const FONT_IMPORT =
  'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&family=Source+Sans+Pro:ital,wght@0,300;0,700;1,300;1,700&display=swap';

export const Frame: React.FC = ({ children }) => {
  return (
    <SearchProvider>
      <PageContainer>
        <Analytics />
        <Global
          styles={css`
          @import url('${FONT_IMPORT}');
          html {
            font-size: 21px;
            font-family: ${font.body};
            font-weight: 300;
            color: ${color.text20};
            line-height: ${line.standard};
          }
          body {
            background: ${color.background10};
            font-family: ${font.body};
            margin: 0;
            padding: 0;
          }
          strong {
            font-weight: 700;
            color: ${color.text10};
          }
          em {
            font-style: normal;
            color: ${color.text10};
          }
        `}
        />
        <Header />
        <ContentContainer>{children}</ContentContainer>
      </PageContainer>
    </SearchProvider>
  );
};

const PageContainer = styled.div`
  margin: 0;
`;
const ContentContainer = styled.div`
  margin: ${space[3]} 0 0 0;
`;
