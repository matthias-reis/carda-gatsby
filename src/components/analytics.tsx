import * as React from 'react';
import { Helmet } from 'react-helmet';

type Global = { dataLayer?: any[]; gtag?: (...props: any) => void };

const g = (globalThis as unknown) as Global;
const GTAG_ID = 'GTM-TXBL5X4';

export const pageView = (title: string, url: string) => {
  gtag('page_view', {
    page_title: title,
    page_location: `${globalThis.location.origin}${globalThis.location.pathname}`,
    page_path: url,
  });
};

export const event = (
  name: string,
  category: string,
  label?: string,
  value?: string
) => {
  console.log('event', name, label);
  gtag(`carda/${name}`, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const gtag = (event: string, payload: any) => {
  g.dataLayer.push({ event, ...payload });
};

export const Analytics = () => {
  return (
    <Helmet>
      <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window, document,'script','dataLayer','${GTAG_ID}');`}</script>
    </Helmet>
  );
};
