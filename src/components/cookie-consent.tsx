import styled from '@emotion/styled';
import * as React from 'react';

import { Link } from './link';

import { color, space, width, font, fontSize } from '../style';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (document.cookie.indexOf('consent=yes') > -1) {
      setIsVisible(false);
    }
  }, [setIsVisible]);

  const disableCookie = () => {
    document.cookie =
      'consent=yes;path=/;expires=Wed, 21 Jul 2100 07:00:00 GMT';
    setIsVisible(false);
  };
  return (
    isVisible && (
      <Wrapper onClick={disableCookie}>
        <Text>
          Um meine Webseite für Dich optimal zu gestalten, sie fortlaufend
          verbessern zu können, sowie ihre Reichweite nachzuverfolgen, verwende
          ich <strong>Cookies</strong>. Durch die weitere Nutzung der Webseite
          stimmst Du der Verwendung von Cookies zu.
        </Text>
        <Text>
          Weitere Infos zu Cookies erhältst Du in meiner{' '}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </Text>
        <div>
          <CTA>Zustimmen und Ausblenden</CTA>
        </div>
      </Wrapper>
    )
  );
};

const Wrapper = styled.header`
  box-shadow: 0 17px 30px -25px ${color.shadow};
  background: ${color.background40};
  border-bottom: 2px solid ${color.border10};
  margin: 0;
  z-index: 19;
  text-align: center;
  padding: ${space[1]};
`;

const Text = styled.p`
  color: ${color.text30};
  max-width: ${width[4]};
  margin: 0 auto;
  padding: 0;
  font-size: 0.75rem;
`;

const CTA = styled.span`
  font-family: ${font.title};
  cursor: pointer;
  font-size: ${fontSize[2]};
  border-radius: ${space[0]};
  background: ${color.background10};
  text-decoration: none;
  color: ${color.text10};
  display: inline-block;
  text-align: center;
  padding: ${space[0]} ${space[1]};
  margin-top: ${space[1]};
  margin-bottom: ${space[1]};

  &:hover {
    text-decoration: underline;
    background: ${color.background40};
  }
`;
