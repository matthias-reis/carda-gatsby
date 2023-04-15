import * as React from 'react';
import styled from '@emotion/styled';
import { color, space, font, width, fontSize } from '../style';
import { H3Deco } from './typo';
import signatureImage from '../assets/signature-image.jpg';
import {
  IconPinterest,
  IconMastodon,
  IconInstagram,
  IconLinkedIn,
} from './icons';

import { event } from './analytics';

export const FooterContent: React.FC = () => (
  <Section>
    <Wrapper>
      <div>
        <Image src={signatureImage} />
      </div>
      <div>
        <H3Deco>Über mich</H3Deco>
        <p>
          Sounds Vegan ist für mich zum Lebensmotto geworden. In meinem Blog
          dreht sich alles um veganes Leben, Tierrechte, Klimaschutz und Musik –
          vor allem Post-Rock & Co.
        </p>
      </div>
      <div>
        <H3Deco>Newsletter</H3Deco>
        <p>
          Dir gefällt, was ich schreibe und möchtest ab jetzt nichts mehr
          verpassen? Hier kannst Du Dich zu meinem Newsletter anmelden.
        </p>
        <CTA
          href="https://mailchi.mp/ed81963a5b3f/soundsvegan"
          target="_blank"
          onClick={() => event('link/click', 'link', 'footer/newsletter')}
        >
          Jetzt zur Anmeldung
        </CTA>
      </div>
      <div>
        <H3Deco>Netzwerk</H3Deco>
        <NetworkList>
          <li>
            <NetworkItem
              href="https://www.instagram.com/anne_reko/"
              target="_blank"
              onClick={() => event('link/click', 'link', 'footer/instagram')}
            >
              <IconInstagram />
              Instagram
            </NetworkItem>
          </li>
          <li>
            <NetworkItem
              href="https://mstdn.social/@anne_reko"
              target="_blank"
              rel="me"
              onClick={() => event('link/click', 'link', 'footer/mastodon')}
            >
              <IconMastodon />
              Mastodon
            </NetworkItem>
          </li>
          <li>
            <NetworkItem
              href="http://pinterest.com/annereko/boards/"
              target="_blank"
              onClick={() => event('link/click', 'link', 'footer/pinterest')}
            >
              <IconPinterest />
              Pinterest
            </NetworkItem>
          </li>
          <li>
            <NetworkItem
              href="https://www.linkedin.com/in/anne-reis/"
              target="_blank"
              onClick={() => event('link/click', 'link', 'footer/linkedin')}
            >
              <IconLinkedIn />
              LinkedIn
            </NetworkItem>
          </li>
        </NetworkList>
      </div>
    </Wrapper>
  </Section>
);

const Section = styled.footer`
  background: ${color.background30};
  padding: ${space[2]};
`;

const Wrapper = styled.div`
  max-width: ${width[5]};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5fr 4fr 4fr 3fr;
  grid-gap: ${space[2]};
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);

    & > div:last-of-type {
      display: none;
    }
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;

    & > div:last-of-type {
      display: block;
    }
    & > div:first-of-type {
      max-width: 300px;
      justify-self: center;
    }
  }
`;

const Image = styled.img`
  width: 100%;
`;

const CTA = styled.a`
  font-family: ${font.title};
  font-size: ${fontSize[3]};
  border-radius: ${space[0]};
  background: ${color.green30};
  text-decoration: none;
  color: ${color.text10};
  display: block;
  width: 100%;
  text-align: center;
  padding: ${space[0]} 0;

  &:hover {
    text-decoration: underline;
    background: ${color.highlight20};
  }
`;

const NetworkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NetworkItem = styled.a`
  display: flex;
  align-items: center;
  font-size: ${fontSize[3]};
  color: ${color.green50};
  text-decoration: none;
  margin-bottom: ${space[1]};
  padding-left: ${space[0]};

  & svg {
    margin-right: ${space[0]};
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
    color: ${color.text10};
    background: ${color.green20};
    border-radius: ${space[1]};
  }
`;
