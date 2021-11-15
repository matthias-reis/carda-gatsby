import * as React from 'react';
import styled from '@emotion/styled';

export const ImagineImage: React.FC<{
  imageId: string;
  onClick?: () => void;
}> = ({ imageId, onClick }) => {
  let imageName = imageId.split('/')[1];
  imageName = imageName.split('-imagine-')[0];
  return (
    <ImageContainer onClick={onClick}>
      <Img src={getFullUrl(imageId)} loading="lazy" />
      <Title>{imageName}</Title>
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

const getFullUrl = (imageId: string) =>
  `https://storage.googleapis.com/cardamonchai-media/${imageId}/640.webp`;
