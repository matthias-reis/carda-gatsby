import * as React from 'react';

type ImageCmp = React.FC<{
  src: string;
  alt: string;
}>;

type ImageMeta = {
  width: number;
  height: number;
  color1: string;
  color2: string;
};

export const Image: ImageCmp = ({ src, alt, ...props }) => {
  const { width, height, color1, color2 } = getImageMeta(src);
  return <img src={src} {...props} loading="lazy" />;
};

function getImageMeta(src: string): string[] {
  return src.split('/').slice(-1)[0].split('.');
}
