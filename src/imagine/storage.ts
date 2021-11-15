import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const BUCKET = 'cardamonchai-media';
const bucket = storage.bucket(BUCKET);

export const uploadFile = async (
  file: string,
  destination: string,
  cacheControl: string = 'public, max-age=31536000' // 1year
) => {
  const result = await bucket.upload(file, {
    gzip: true,
    public: true,
    destination,
    metadata: {
      cacheControl,
    },
  });
  return result;
};

export const getFiles = async () => {
  const [files] = await bucket.getFiles();
  return files;
};

export const addCors = async () => {
  await bucket.setCorsConfiguration([
    {
      maxAgeSeconds: 3600, // 1 hour
      method: ['GET'],
      origin: ['*'],
      responseHeader: ['Content-Type'],
    },
  ]);
};
