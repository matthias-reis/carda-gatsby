import { parse } from 'path';
import { sync as mkdirp } from 'mkdirp';
import { redBright } from 'chalk';

import { SharpObject } from './sharpify';

const variantSpecs: { size: number; type: Extension }[] = [
  { size: 1200, type: 'fb' },
  { size: 1440, type: 'jpg' },
  { size: 900, type: 'jpg' },
  { size: 640, type: 'jpg' },
  { size: 400, type: 'jpg' },
  { size: 240, type: 'jpg' },
  { size: 1440, type: 'webp' },
  { size: 900, type: 'webp' },
  { size: 640, type: 'webp' },
  { size: 400, type: 'webp' },
  { size: 240, type: 'webp' },
];

export const createImages = async (
  images: SharpObject[],
  tmpDir: string
): Promise<Image[]> => {
  return await Promise.all(
    images.map(async (image) => {
      const variants = await Promise.all(
        variantSpecs.map(async (spec) => {
          try {
            const fileAndDestination = await createImage(
              image,
              spec.size,
              spec.type,
              tmpDir
            );
            return fileAndDestination;
          } catch (e) {
            console.log(
              redBright(`ERROR on ${image.name} @ ${spec.type}-${spec.size}`, e)
            );
            return ['', ''] as [string, string];
          }
        })
      );
      return {
        ...image,
        variants,
      };
    })
  );
};

export type Image = SharpObject & {
  variants: [string, string][];
};

type Extension = 'jpg' | 'webp' | 'fb';

async function createImage(
  image: SharpObject,
  size: number,
  extension: 'jpg' | 'webp' | 'fb',
  tmpDir: string
): Promise<[string, string]> {
  const destinationName = `${image.baseName}/${size}.${
    extension === 'fb' ? 'png' : extension
  }`.slice(1);
  const fileName = `${tmpDir}/${destinationName}`;
  const fileDir = parse(fileName).dir;
  mkdirp(fileDir);
  try {
    let sharp = image.sharpened
      .withMetadata()
      .resize(size, size, { fit: 'inside' })
      .sharpen();
    if (extension === 'jpg') {
      sharp = sharp.jpeg({
        quality: 70,
        chromaSubsampling: '4:2:0',
        progressive: true,
        force: true,
      });
    } else if (extension === 'webp') {
      sharp = sharp.webp({
        quality: 60,
        force: true,
      });
    } else if (extension === 'fb') {
      sharp = sharp.png({
        compressionLevel: 9,
        progressive: false,
        adaptiveFiltering: true,
        force: true,
      });
    }
    await sharp.toFile(fileName);
    return [fileName, destinationName];
  } catch (e) {
    console.error(redBright(`error creating ${fileName}`));
    console.error(e);
    process.exit(1);
  }
}
