import type { Image } from './create-images';
import { uploadFile } from './storage';

export const uploadImages = async (locallyCreatedImages: Image[]) => {
  for (const image of locallyCreatedImages) {
    for (const [file, destination] of image.variants) {
      await uploadFile(file, destination);
    }
    await uploadFile(
      image.file,
      `${image.baseName.slice(1)}/original${image.ext}`
    );
  }
};
