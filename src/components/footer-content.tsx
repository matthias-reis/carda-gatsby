import * as React from 'react';
import styled from '@emotion/styled';
import { color, space, font, width, fontSize } from '../style';
import { H3Deco } from './typo';
import signatureImage from '../assets/signature-image.jpg';
import {
  IconPinterest,
  IconTwitter,
  IconInstagram,
  IconFacebook,
  IconBloglovin,
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
          Rock 'n' Roll vegan ist für mich zum Lebensmotto geworden. In meinem
          Blog dreht sich alles um veganen Lifestyle, Musik, Nach­hal­tig­keit,
          Reisen und meine Wahlheimat Hamburg.
        </p>
      </div>
      <div>
        <H3Deco>Newsletter</H3Deco>
        <p>
          Dir gefällt, was ich schreibe und möchtest ab jetzt nichts mehr
          verpassen? Hier kannst Du Dich zu meinem Newsletter anmelden.
        </p>
        <CTA
          href="https://mailchi.mp/94bdbb6fded3/cardamonchai"
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
              href="https://twitter.com/Anne_Reko"
              target="_blank"
              onClick={() => event('link/click', 'link', 'footer/twitter')}
            >
              <IconTwitter />
              Twitter
            </NetworkItem>
          </li>
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
              href="https://www.facebook.com/cardamonchai"
              target="_blank"
              onClick={() => event('link/click', 'link', 'footer/facebook')}
            >
              <IconFacebook />
              Facebook
            </NetworkItem>
          </li>
          <li>
            <NetworkItem
              href="http://www.bloglovin.com/blog/2889954/cardamonchai"
              target="_blank"
              onClick={() => event('link/click', 'link', 'footer/bloglovin')}
            >
              <IconBloglovin />
              Bloglovin
            </NetworkItem>
          </li>
        </NetworkList>
      </div>
    </Wrapper>
  </Section>
);

const Section = styled.footer`
  background: ${color.green10};
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
  color: ${color.text30};
  text-decoration: none;
  margin-bottom: ${space[1]};

  & svg {
    margin-right: ${space[0]};
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover {
    color: ${color.text10};
  }
`;
