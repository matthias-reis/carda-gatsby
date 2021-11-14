import * as React from 'react';
import styled from '@emotion/styled';
import { Frame } from '../components/frame';
import { Storage } from '@google-cloud/storage';

const Container = styled.div`
  max-width: 34rem;
  margin: 0 auto;
`;
const rulingImage = '/2021-09/rinderwahnsin-bse/080808_1024_768';

const MainImage = ({ src }) => {
  const base = `/img${src}`;

  return (
    <Picture width={34}>
      <source
        type="image/webp"
        srcSet={`
        ${base}_400.webp   400w,
        ${base}_640.webp   640w,
        ${base}_900.webp   900w,
        ${base}_1440.webp 1440w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 68rem,
        (min-width: 34rem) 34rem,
        100vw
        `}
      />
      <source
        type="image/jpeg"
        srcSet={`
        ${base}_400.jpg   400w,
        ${base}_640.jpg   640w,
        ${base}_900.jpg   900w,
        ${base}_1440.jpg 1440w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 68rem,
        (min-width: 34rem) 34rem,
        100vw
        `}
      />

      <img loading="lazy" src={`${base}_900.jpg`} alt="i" />
    </Picture>
  );
};

const MediumImage = ({ src }) => {
  const base = `/img${src}`;

  return (
    <Picture width={21}>
      <source
        type="image/webp"
        srcSet={`
        ${base}_400.webp   400w,
        ${base}_640.webp   640w,
        ${base}_900.webp   900w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 42rem,
        (min-width: 34rem) 21rem,
        100vw
        `}
      />
      <source
        type="image/jpeg"
        srcSet={`
        ${base}_400.jpg   400w,
        ${base}_640.jpg   640w,
        ${base}_900.jpg   900w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 42rem,
        (min-width: 34rem) 21rem,
        100vw
        `}
      />

      <img loading="lazy" src={`${base}_640.jpg`} alt="i" />
    </Picture>
  );
};

const SmallImage = ({ src }) => {
  const base = `/img${src}`;

  return (
    <Picture width={13}>
      <source
        type="image/webp"
        srcSet={`
        ${base}_400.webp   400w,
        ${base}_640.webp   640w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 26rem,
        (min-width: 34rem) 13rem,
        100vw
        `}
      />
      <source
        type="image/jpeg"
        srcSet={`
        ${base}_400.jpg   400w,
        ${base}_640.jpg   640w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 26rem,
        (min-width: 34rem) 13rem,
        100vw
        `}
      />

      <img loading="lazy" src={`${base}_400.jpg`} alt="i" />
    </Picture>
  );
};

const ListImage = ({ src }) => {
  const base = `/img${src}`;

  return (
    <Picture width={8}>
      <source
        type="image/webp"
        srcSet={`
        ${base}_400.webp   400w,
        ${base}_640.webp   640w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 16rem,
        (min-width: 34rem) 8rem,
        100vw
        `}
      />
      <source
        type="image/jpeg"
        srcSet={`
        ${base}_400.jpg   400w,
        ${base}_640.jpg   640w
        `}
        sizes={`
        (min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) 16rem,
        (min-width: 34rem) 8rem,
        100vw
        `}
      />

      <img loading="lazy" src={`${base}_400.jpg`} alt="i" />
    </Picture>
  );
};

export default () => {
  return (
    <Frame>
      <Container>
        <h1>Image Examples</h1>
        <h2>Large Image</h2>
        <MainImage src={rulingImage} />
        <h2>Medium Image</h2>
        <MediumImage src={rulingImage} />
        <h2>Small Image</h2>
        <SmallImage src={rulingImage} />
        <h2>Image List</h2>
        <Items>
          {[...Array(10).fill(' ')].map(() => (
            <Item>
              <ListImage src={rulingImage} />
            </Item>
          ))}
        </Items>
      </Container>
    </Frame>
  );
};

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  align-items: stretch;
`;

const Item = styled.div``;

const Picture = styled.picture<{ width: number }>`
  & img {
    width: 100vw;
    max-width: ${({ width }) => width}rem;
  }

  @media (max-width: 34rem) {
    & img {
      max-width: 100vw;
    }
  }
`;
