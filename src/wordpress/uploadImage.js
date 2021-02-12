const { Storage } = require('@google-cloud/storage');
const toBucketSlug = require('./to-bucket-slug');

const BUCKET = 'cardamonchai-images';
const BUCKET_BASE_URL = `https://storage.googleapis.com/${BUCKET}/`;

module.exports = async (l, e, image, media) => {
  if (!image.error) {
    const name = toBucketSlug(image.sourceUrl);

    try {
      const storage = new Storage();
      const bucket = storage.bucket(BUCKET);

      const largeFileName = `${name}__l.jpg`;
      const mediumFileName = `${name}__m.jpg`;
      const smallFileName = `${name}__s.jpg`;

      const largeFile = bucket.file(largeFileName);
      const mediumFile = bucket.file(mediumFileName);
      const smallFile = bucket.file(smallFileName);

      await largeFile.save(image.largeBuffer);
      await mediumFile.save(image.mediumBuffer);
      await smallFile.save(image.smallBuffer);

      image.largeUrl = `${BUCKET_BASE_URL}${largeFileName}`;
      image.mediumUrl = `${BUCKET_BASE_URL}${mediumFileName}`;
      image.smallUrl = `${BUCKET_BASE_URL}${smallFileName}`;

      delete image.largeBuffer;
      delete image.mediumBuffer;
      delete image.smallBuffer;
      image.processed = true;
    } catch (err) {
      e(err.message);
      image.error = err.message;
      media.errors[image.id] = err.message;
    }
  }
};
