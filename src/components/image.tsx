import styled from '@emotion/styled';
import * as React from 'react';
import { Imagine } from './imagine';

type ImageCmp = React.FC<{
  src: string;
  alt: string;
  size: 8 | 13 | 21 | 34;
}>;

type ImageMeta = {
  width: number;
  height: number;
  color1: string;
  color2: string;
};

export const Image: ImageCmp = ({ src, size, ...props }) => {
  const img = new Imagine(src);
  const { width, height, color1, color2 } = img.meta;
  const sizes = `(min-width: 34rem) and (-webkit-min-device-pixel-ratio: 2) ${
    size * 2
  }rem,
  (min-width: 34rem) ${size}rem,
  100vw`;

  return (
    <ImageContainer
      style={{
        background: `linear-gradient(0deg, #${color1} 0%, #${color2} 100%)`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Picture>
        <source type="image/webp" srcSet={img.webpSrcSet} sizes={sizes} />
        <source type="image/jpeg" srcSet={img.jpegSrcSet} sizes={sizes} />
        <Img {...props} loading="lazy" src={img.previewUrl} />
      </Picture>
    </ImageContainer>
  );
};

const Picture = styled.picture`
  width: 100%;
  display: block;
`;

const Img = styled.img`
  width: 100%;
  display: block;
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
