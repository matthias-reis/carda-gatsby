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
  const source = src.replace(/%/g, '%25');
  loading = (loading || '').replace(/'/g, '');
  const [s, setSrc] = React.useState(loading || source);
  loading &&
    React.useEffect(() => {
      const i = new Image();
      i.src = source;
      i.onload = () => {
        // double escaping hhtml encoded characters
        setSrc(source);
      };
    }, [loading, setSrc]);

  return <Img src={s} {...props} />;
};

const Img = styled.img`
  width: 100%;
`;
