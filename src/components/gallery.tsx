import * as React from 'react';
import styled from '@emotion/styled';
import { space, width } from '../style';
import { useKeyboard } from './useKeyboard';
import { IconChevronLeft, IconChevronRight, IconClose } from './icons';

type GalleryImage = {
  mediumUrl: string;
  largeUrl: string;
};

type GalleryProps = {
  name?: string;
  images?: GalleryImage[];
};

const mapUrls = (name: string) => (item: { m: string; l: string }) => {
  const parts = name.split('/');
  if (parts.length === 1) {
    return { mediumUrl: item.m, largeUrl: item.l };
  } else {
    return {
      mediumUrl: item.m.replace(parts[1], name),
      largeUrl: item.l.replace(parts[1], name),
    };
  }
};

export const Gallery: React.FC<GalleryProps> = ({ images = [], name }) => {
  const [usedImages, setUsedImages] = React.useState(images);

  React.useEffect(() => {
    if (name) {
      (async function loadImageMetaFromGoogleStorage() {
        const url = `https://storage.googleapis.com/cardamonchai-galleries/${name}/index.json`;
        const res = await fetch(url);
        let { images } = await res.json();
        setUsedImages(images.map(mapUrls(name)));
      })();
    }
  }, [usedImages, setUsedImages, name]);
  return <InternalGallery images={usedImages} />;
};

const InternalGallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [currentId, setCurrentId] = React.useState<number>(0);

  const handleClick = (id: number) => {
    setIsOpened(true);
    setCurrentId(id);
  };

  return (
    <>
      <Container>
        {images.map((imageProps, id) => (
          <Image {...imageProps} onClick={() => handleClick(id)} />
        ))}
      </Container>
      {isOpened && (
        <Overlay
          images={images}
          currentId={currentId}
          setIsOpened={setIsOpened}
          setCurrentId={setCurrentId}
        />
      )}
    </>
  );
};

const Image: React.FC<GalleryImage & React.ImgHTMLAttributes<unknown>> = ({
  mediumUrl,
  ...props
}) => <StyledImage src={mediumUrl} {...props} />;

type OverlayProps = {
  images: GalleryImage[];
  currentId: number;
  setIsOpened: (isOpened: boolean) => void;
  setCurrentId: (currentId: number) => void;
};

const Overlay: React.FC<OverlayProps> = ({
  images,
  currentId,
  setIsOpened,
  setCurrentId,
}) => {
  const handleBack = () => {
    if (currentId === 0) {
      setCurrentId(images.length - 1);
    } else {
      setCurrentId(currentId - 1);
    }
  };
  const handleNext = () => {
    if (currentId === images.length - 1) {
      setCurrentId(0);
    } else {
      setCurrentId(currentId + 1);
    }
  };
  const handleKey = (ev: KeyboardEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    switch (ev.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        handleNext();
        return;
      case 'ArrowLeft':
      case 'ArrowUp':
        handleBack();
        return;
      case 'x':
      case 'Escape':
        setIsOpened(false);
        return;
    }
  };
  useKeyboard(handleKey);

  return (
    <Backdrop onClick={() => setIsOpened(false)}>
      <Back
        onClick={(ev) => {
          ev.stopPropagation();
          handleBack();
        }}
      >
        <IconChevronLeft />
      </Back>
      <Next
        onClick={(ev) => {
          ev.stopPropagation();
          handleNext();
        }}
      >
        <IconChevronRight />
      </Next>
      <Close
        onClick={(ev) => {
          ev.stopPropagation();
          setIsOpened(false);
        }}
      >
        <IconClose />
      </Close>
      <LightboxImage src={images[currentId].largeUrl} />
    </Backdrop>
  );
};

const Button = styled.button`
  width: 150px;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 1;
  border: 0;
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &:focus {
    border: 0;
    outline: 0;
  }
  & svg {
    display: block;
    padding: ${space[1]};
  }
`;

const Back = styled(Button)`
  left: 0;
  justify-content: flex-start;
`;

const Next = styled(Button)`
  right: 0;
`;
const Close = styled(Button)`
  height: 100px;
  right: 0;
  z-index: 2;
  align-items: flex-start;
`;

const LightboxImage = styled.img`
  position: fixed;
  max-width: 90vw;
  max-height: 90vh;
  border: 3px solid #000;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background: #000b;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  left: 50%;
  margin-left: -45vw;
  padding-top: ${space[3]};
  padding-bottom: ${space[3]};
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${space[3]};
`;

const StyledImage = styled.img`
  border: 3px solid #000;
  height: ${width[2]};
  box-shadow: 0 15px 45px -10px #0008;
`;
