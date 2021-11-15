import * as React from 'react';
import styled from '@emotion/styled';
import { Imagine } from './imagine';

export const ImagineImage: React.FC<{
  imageId: string;
  onClick?: () => void;
}> = ({ imageId, onClick }) => {
  const image = new Imagine(imageId);

  return (
    <ImageContainer onClick={onClick}>
      <Img src={image.previewUrl} loading="lazy" />
      <Title>{image.name}</Title>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #444;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background: #222;
    border: 1px solid #555;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  display: block;
`;

const Title = styled.p`
  font-size: 14px;
`;
