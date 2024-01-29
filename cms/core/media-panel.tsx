import { FC, useEffect, useState } from 'react';
import { Wait } from '@/components/wait';
import { log } from './log';
import { Imagine } from './imagine';
import { MagnifyingGlassIcon as SearchIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { atom, useAtom } from 'jotai';

const imagesAtom = atom<string[]>([]);
const selectedImageAtom = atom<string>('');
const filterAtom = atom<string>('');

export const MediaPanel: FC = () => {
  const [images, setImages] = useAtom(imagesAtom);
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  useEffect(() => {
    (async () => {
      const images = await fetch(
        'https://storage.googleapis.com/cardamonchai-media/imagine-index.json'
      ).then((res) => res.json());
      log('imagine', `fetched images ${images.length}`);
      setImages((images as string[]).reverse());
    })();
  }, [setImages]);

  const filteredImages = filter
    ? images.filter((image) =>
        new Imagine(image).name
          .toLowerCase()
          .includes(filter.replace(/ /g, '-').toLowerCase())
      )
    : images.reverse().slice(0, 100);

  return (
    <div className="flex flex-col items-stretch justify-stretch h-full">
      <h2 className="bg-stone-800 px-2 py-4 font-condensed bold text-2xl border-b">
        Imagine Media Manager
      </h2>
      {images.length === 0 && <Loading />}
      {images.length > 0 && (
        <div className="flex flex-col gap-2 p-4">
          <Filter filter={filter} setFilter={setFilter} />
          {selectedImage && <SelectedImage selection={selectedImage} />}
          <Images
            set={filteredImages}
            select={(image) => setSelectedImage(image)}
          />
        </div>
      )}
    </div>
  );
};

const Filter: FC<{ filter: string; setFilter: (f: string) => void }> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="flex gap-3 items-center">
      <SearchIcon />
      <Input
        placeholder="Filter"
        value={filter}
        onChange={(ev) => {
          const value = ev.currentTarget.value;
          setFilter(value);
        }}
      />
    </div>
  );
};
const SelectedImage: FC<{ selection: string }> = ({ selection }) => {
  const img = new Imagine(selection);
  return (
    <div className="rounded flex gap-3 bg-stone-700 p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={img.name}
        src={img.previewUrl}
        className="h-48 w-48 object-contain bg-stone-950"
      />
      <div className="flex flex-col gap-2">
        <p>{img.name}</p>
        <CopyButton text={img.previewUrl} label="URL" />
        <CopyButton text={`![Bildtitel](${img.previewUrl})`} label="MD" />
      </div>
    </div>
  );
};

const Images: FC<{ set: string[]; select: (i: string) => void }> = ({
  set,
  select,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {set.map((s) => {
        const image = new Imagine(s);
        return (
          <Card
            key={s}
            className="p-2 flex flex-col items-center cursor-pointer"
            onClick={() => select(s)}
            role="button"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={image.name}
              src={image.previewUrl}
              className="h-32 w-32 object-contain bg-stone-950"
            />
            <p className="text-sm font-condensed text-center">{image.name}</p>
          </Card>
        );
      })}
    </div>
  );
};

const CopyButton: FC<{ text: string; label: string }> = ({ text, label }) => {
  return (
    <Button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
      }}
    >
      Kopiere {label}
    </Button>
  );
};

const Loading: FC = () => {
  return <Wait />;
};
