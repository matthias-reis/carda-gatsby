import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import { Header } from './header';
import { CookieConsent } from './cookie-consent';
import { Analytics } from './analytics';
import { SearchProvider } from './search-provider';
import { AdminBar } from './admin-bar';

import { space, font, line, color, fontSize } from '../style';
import { Helmet } from 'react-helmet';

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
            .footnotes ol:before {
              display: block;
              content: 'Fußnoten:';
            }

            .footnotes ol a:last-child {
              text-decoration: none;
              display: inline-block;
              color: ${color.green10};
              font-size: ${fontSize[2]};
              margin-left: ${space[2]};
              &:before {
                content: 'zurück';
                margin-right: ${space[0]};
              }
              &:hover {
                color: ${color.green30};
              }
            }
          `}
        />
        <Header />
        <CookieConsent />
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1, maximum-scale=1"
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="/icons/cardaicon.ico?v=1"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link
            rel="icon"
            href="/icons/android-chrome-192x192.png"
            sizes="192x192"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/icons/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="theme-color" content={color.background10} />
          <meta
            name="google-site-verification"
            content="5QfgSmDjmWKGtsXLfeirHMiVgXSp99T7jdMpnnvILQ0"
          />
          <meta
            name="google-site-verification"
            content="0bzAuCnTXlrcFeB_nSHw0T4MWdVmHSvvynzkRgZYRpg"
          />
          <meta
            name="robots"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta property="og:site_name" content="Rock'n'Roll vegan" />
          <meta property="fb:app_id" content="1254825647866255" />
          <meta
            property="article:publisher"
            content="https://www.facebook.com/cardamonchai"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@Anne_Reko" />
          <meta name="twitter:site" content="@Anne_Reko" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RocknRoll vegan &raquo; Feed"
            href="/feed/"
          />
        </Helmet>
        <ContentContainer>{children}</ContentContainer>
        <AdminBar />
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
