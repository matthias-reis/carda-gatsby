import * as React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import { Header } from './header';
import { Analytics } from './analytics';
import { SearchProvider } from './search-provider';

import { space, font, line, color, fontSize } from '../style';
import { Helmet } from 'react-helmet';

export const Frame: React.FC = ({ children }) => {
  return (
    <SearchProvider>
      <PageContainer>
        <Analytics />
        <Global
          styles={css`
            /* josefin-sans-300 - latin */
            @font-face {
              font-family: 'Josefin Sans';
              font-style: normal;
              font-weight: 300;
              src: url('/fonts/josefin-sans-v25-latin-300.eot'); /* IE9 Compat Modes */
              src: local(''),
                url('/fonts/josefin-sans-v25-latin-300.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('/fonts/josefin-sans-v25-latin-300.woff2')
                  format('woff2'),
                /* Super Modern Browsers */
                  url('/fonts/josefin-sans-v25-latin-300.woff') format('woff'),
                /* Modern Browsers */
                  url('/fonts/josefin-sans-v25-latin-300.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('/fonts/josefin-sans-v25-latin-300.svg#JosefinSans')
                  format('svg'); /* Legacy iOS */
            }
            /* source-sans-pro-300 - latin */
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 300;
              src: url('/fonts/source-sans-pro-v21-latin-300.eot'); /* IE9 Compat Modes */
              src: local(''),
                url('/fonts/source-sans-pro-v21-latin-300.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('/fonts/source-sans-pro-v21-latin-300.woff2')
                  format('woff2'),
                /* Super Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-300.woff')
                  format('woff'),
                /* Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-300.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('/fonts/source-sans-pro-v21-latin-300.svg#SourceSansPro')
                  format('svg'); /* Legacy iOS */
            }
            /* source-sans-pro-300italic - latin */
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: italic;
              font-weight: 300;
              src: url('/fonts/source-sans-pro-v21-latin-300italic.eot'); /* IE9 Compat Modes */
              src: local(''),
                url('/fonts/source-sans-pro-v21-latin-300italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */
                  url('/fonts/source-sans-pro-v21-latin-300italic.woff2')
                  format('woff2'),
                /* Super Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-300italic.woff')
                  format('woff'),
                /* Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-300italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('/fonts/source-sans-pro-v21-latin-300italic.svg#SourceSansPro')
                  format('svg'); /* Legacy iOS */
            }
            /* source-sans-pro-700 - latin */
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: url('/fonts/source-sans-pro-v21-latin-700.eot'); /* IE9 Compat Modes */
              src: local(''),
                url('/fonts/source-sans-pro-v21-latin-700.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('/fonts/source-sans-pro-v21-latin-700.woff2')
                  format('woff2'),
                /* Super Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-700.woff')
                  format('woff'),
                /* Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-700.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('/fonts/source-sans-pro-v21-latin-700.svg#SourceSansPro')
                  format('svg'); /* Legacy iOS */
            }
            /* source-sans-pro-700italic - latin */
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: italic;
              font-weight: 700;
              src: url('/fonts/source-sans-pro-v21-latin-700italic.eot'); /* IE9 Compat Modes */
              src: local(''),
                url('/fonts/source-sans-pro-v21-latin-700italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */
                  url('/fonts/source-sans-pro-v21-latin-700italic.woff2')
                  format('woff2'),
                /* Super Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-700italic.woff')
                  format('woff'),
                /* Modern Browsers */
                  url('/fonts/source-sans-pro-v21-latin-700italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('/fonts/source-sans-pro-v21-latin-700italic.svg#SourceSansPro')
                  format('svg'); /* Legacy iOS */
            }
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

            .footnotes {
              font-size: ${fontSize[2]};
            }
            .footnotes ol:before {
              display: block;
              content: 'Fußnoten:';
              font-size: ${fontSize[3]};
            }
            .footnotes ol a:last-child {
              text-decoration: none;
              display: inline-block;
              color: ${color.green10};
              font-size: ${fontSize[1]};
              margin-left: ${space[2]};
              &:before {
                content: 'zurück';
                margin-right: ${space[0]};
              }
              &:hover {
                color: ${color.green30};
              }
            }
            input[type='search']::-webkit-search-decoration,
            input[type='search']::-webkit-search-cancel-button,
            input[type='search']::-webkit-search-results-button,
            input[type='search']::-webkit-search-results-decoration {
              -webkit-appearance: none;
            }
          `}
        />
        <Header />
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
          <meta property="og:site_name" content="Rock 'n' Roll vegan" />
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
