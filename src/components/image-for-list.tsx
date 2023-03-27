import * as React from 'react';
import { Image } from './image';

export const ImageForList: React.FC<{
  src: string;
  alt: string;
  isLarge: boolean;
}> = ({ isLarge, ...props }) => {
  return <Image {...props} size={isLarge ? 21 : 8} />;
};
