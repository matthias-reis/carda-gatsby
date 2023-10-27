import { basename } from 'node:path';
import { Storage } from '@google-cloud/storage';
import glob from 'glob';
import { log } from './log';

const BUCKET = 'cardamonchai-galleries';

export const upload = async (folder: string, glryName: string) => {
  const files = glob.sync(`${folder}/*.*`);

  const storage = new Storage();
  const promises = files.map(async (file) => {
    const destination = `${glryName}/${basename(file)}`;

    const result = await storage.bucket(BUCKET).upload(file, {
      gzip: true,
      public: true,
      destination,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    log(`${destination} uploaded`);
  });
  return Promise.all(promises);
};
