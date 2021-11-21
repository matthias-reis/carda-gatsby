import * as React from 'react';
import styled from '@emotion/styled';
import { ImagineLogo } from './imagine-logo';
import { ImagineImage } from './imagine-image';
import { Imagine } from './imagine';
import { IconSearch } from './icons';
import { color, font } from '../style';

export const ImagineController = () => {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [filter, setFilter] = React.useState('');

  // fetch the content first
  React.useEffect(() => {
    (async () => {
      const images = await fetch(
        'https://storage.googleapis.com/cardamonchai-media/imagine-index.json'
      ).then((res) => res.json());
      setImages((images as string[]).reverse());
      setSelectedImage('');
      setFilter('');
    })();
  }, [setImages]);

  const filteredImages = filter
    ? images.filter((image) =>
        new Imagine(image).name
          .toLowerCase()
          .includes(filter.replace(/ /g, '-').toLowerCase())
      )
    : images;

  return (
    <Container>
      {images.length ? (
        <MainArea>
          <ContentArea>
            <HeaderArea>
              <Logo />
              <FilterArea>
                <Filter
                  value={filter}
                  onChange={(ev) => setFilter(ev.target.value)}
                />
                <SearchIcon />
              </FilterArea>
            </HeaderArea>
            <ImageArea>
              {filteredImages.map((image) => (
                <ImagineImage
                  imageId={image}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </ImageArea>
          </ContentArea>
          {selectedImage && (
            <DetailArea>
              <H2>Auswahl</H2>
              <ImagineImage imageId={selectedImage} />
              <Copy
                onClick={async () => {
                  const image = new Imagine(selectedImage);
                  await navigator.clipboard.writeText(image.previewUrl);
                }}
              />
            </DetailArea>
          )}
        </MainArea>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;

const HeaderArea = styled.div`
  display: flex;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const Logo = styled(ImagineLogo)`
  height: 48px;
  width: 250px;
  flex: 0 0 auto;
`;

const FilterArea = styled.label`
  width: 40%;
  flex: 0 1 auto;
  display: flex;
`;

const Filter = styled.input`
  width: 100%;
  flex: 1 1 auto;
  font-size: 24px;
  background: transparent;
  color: #fff;
  border: none;
  border-bottom: 2px solid #fff;

  &:focus {
    border: none;
    border-bottom: 2px solid #fff;
    outline: 0;
  }
`;

const SearchIcon = styled(IconSearch)`
  height: 100%;
`;

const MainArea = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  border: 1px solid #222;
  background: #000;
  padding: 12px;
  flex: 1 1 auto;
`;
const ImageArea = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  flex: 1 1 auto;
`;

const DetailArea = styled.div`
  position: sticky;
  right: 0;
  top: 0;
  border: 1px solid #333;
  background: #111;
  margin-left: 12px;
  width: 300px;
  padding: 12px;
`;

const H2 = styled.h2`
  font-weight: 200;
  text-transform: uppercase;
  margin: 0 0 12px;
`;

const CopyButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 12px;
  border: 0;
  background: ${color.green30};
  color: #fff;
  font-weight: bold;
  font-family: ${font.title};
  height: 32px;
  font-size: 20px;
  border-radius: 16px;
`;

const Copy = ({ onClick, ...props }) => {
  const [status, setStatus] = React.useState<'default' | 'waiting' | 'done'>(
    'default'
  );

  let text = 'URL kopieren';
  if (status === 'waiting') text = '...';
  if (status === 'done') text = '✔';

  console.log(text);

  return (
    <CopyButton
      {...props}
      onClick={async () => {
        console.log('clicking');
        setStatus('waiting');
        await onClick();
        setStatus('done');
        setTimeout(() => {
          setStatus('default');
        }, 5000);
      }}
    >
      {text}
    </CopyButton>
  );
};

const Loading = () => (
  <LoadingText>
    <Logo />
    <p>Bilder werden geladen ...</p>
  </LoadingText>
);

const LoadingText = styled.div`
  text-align: center;
  color: #444;
  font-size: 32px;
  font-weight: bold;
`;
