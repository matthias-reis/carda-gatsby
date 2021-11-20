import * as React from 'react';
import { Image } from './image';

export const ImageForList: React.FC<{ src: string; alt: string }> = (props) => {
  return <Image {...props} size={8} />;
};
