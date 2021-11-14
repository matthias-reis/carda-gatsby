import sharp from 'sharp';
import { TinyColor } from '@ctrl/tinycolor';
import { ParsedImage } from './get-image-file-names';

const date = new Date();
const year = date.getFullYear();
const month = `00${date.getMonth() + 1}`.slice(-2);
const day = `00${date.getDate()}`.slice(-2);
const datePath = `/${year}-${month}-${day}`;

export const sharpify = async (
  images: ParsedImage[]
): Promise<SharpObject[]> => {
  return await Promise.all(
    images.map(async (image): Promise<SharpObject> => {
      const name = slugify(image.name);
      const basePath = `${datePath}/${name}`;
      const sharpened = sharp(image.file);
      const stats = await sharpened.stats();
      const { width, height } = (await sharpened.metadata()) as {
        width: number;
        height: number;
      };
      const [meanR, meanG, meanB] = stats.channels
        .slice(0, 3)
        .map((c) => Math.round(c.mean));
      const dominant = stats.dominant;
      const meanColor = new TinyColor({ r: meanR, g: meanG, b: meanB }).toHex();
      const dominantColor = new TinyColor(dominant).toHex();
      const baseName = `${basePath}-imagine-${dominantColor}_${meanColor}_${width}_${height}`;

      return {
        ...image,
        width,
        height,
        basePath,
        baseName,
        meanColor,
        dominantColor,
        sharpened,
      };
    })
  );
};

export type SharpObject = ParsedImage & {
  width: number;
  height: number;
  basePath: string;
  baseName: string;
  dominantColor: string;
  meanColor: string;
  sharpened: sharp.Sharp;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
