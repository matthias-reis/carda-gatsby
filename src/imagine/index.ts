import { yellow } from 'chalk';
import { resolve } from 'path';
import { tmpdir } from 'os';

import { getImageFileNames } from './get-image-file-names';
import { sharpify } from './sharpify';
import { createImages } from './create-images';
import { uploadImages } from './upload-images';
import { reindexBucket } from './reindex-bucket';

const dir = resolve(process.argv[2]);
const TMP_DIR = `${tmpdir()}/carda-imagine`;

const run = async () => {
  const t0 = Date.now();
  console.log('Carda IMAGINE image processing and preparation');
  console.log(`running on ${yellow(dir)}`);

  const images = getImageFileNames(dir);
  const t1 = Date.now();
  console.log(`(1) found ${yellow(images.length)} images in ${t1 - t0} ms`);
  const sharpifiedImages = await sharpify(images);
  const t2 = Date.now();
  console.log(`(2) sharpified images in ${t2 - t1} ms`);
  const locallyCreatedImages = await createImages(sharpifiedImages, TMP_DIR);
  const t3 = Date.now();
  console.log(`(3) locally created images in ${t3 - t2} ms`);
  const uploadedImages = await uploadImages(locallyCreatedImages);
  const t4 = Date.now();
  console.log(`(4) uploaded images in ${t4 - t3} ms`);
  await reindexBucket(TMP_DIR);
  const t5 = Date.now();
  console.log(`(5) reindexed bucket in ${t5 - t4} ms`);
};

run();
