import styled from '@emotion/styled';
import * as React from 'react';

type CardaImageProps = {
  loading?: string;
  src: string;
  alt: string;
};

export const CardaImage: React.FC<CardaImageProps> = ({
  loading,
  src,
  ...props
}) => {
  loading = (loading || '').replace(/'/g, '');
  const [source, setSrc] = React.useState(loading || src);
  loading &&
    React.useEffect(() => {
      const i = new Image();
      i.src = src;
      i.onload = () => {
        setSrc(src);
      };
    }, [loading, setSrc]);

  return <Img src={source} {...props} />;
};

const Img = styled.img`
  width: 100%;
`;
