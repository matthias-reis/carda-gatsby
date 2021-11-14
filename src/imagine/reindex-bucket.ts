import { yellow } from 'chalk';
import { writeFileSync } from 'fs';
import { getFiles, uploadFile } from './storage';

const INDEX_FILE = 'imagine-index.json';

export const reindexBucket = async (tmpDir: string) => {
  const files = await getFiles();
  const ids = files
    .filter((file) => {
      return file.id !== INDEX_FILE;
    })
    .map((file) =>
      decodeURIComponent(file.id as string)
        .split('/')
        .slice(0, 2)
        .join('/')
    );
  const uniqueIds = Array.from(new Set<string>(ids));

  // write them to a local file
  const filePath = `${tmpDir}/${INDEX_FILE}`;
  writeFileSync(filePath, JSON.stringify(uniqueIds, null, 2), 'utf8');

  // upload that file to our storage bucket and turn off caching
  uploadFile(filePath, INDEX_FILE, 'no-cache');

  console.log(`number of images in bucket: ${yellow(uniqueIds.length)}`);
};
