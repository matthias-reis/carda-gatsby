const sharp = require('sharp');

module.exports = async (l, e, image, media) => {
  if (!image.error) {
    try {
      const original = sharp(image.buffer);

      const base64Buffer = await original
        .resize(32, 32, { fit: 'inside' })
        .sharpen()
        .toBuffer();

      image.base64String = `data:image/jpeg;base64,${base64Buffer.toString(
        'base64'
      )}`;

      image.smallBuffer = await original
        .withMetadata()
        .resize({ width: 600 })
        .sharpen(2.5, 0.5, 2)
        .jpeg({
          quality: 40,
          chromaSubsampling: '4:4:4',
          progressive: true,
        })
        .toBuffer();
      image.mediumBuffer = await original
        .withMetadata()
        .resize({ width: 800 })
        .sharpen(2, 0.5, 2)
        .jpeg({
          quality: 60,
          chromaSubsampling: '4:4:4',
          progressive: true,
        })
        .toBuffer();
      image.largeBuffer = await original
        .withMetadata()
        .resize({ width: 1960 })
        .sharpen(2, 0.5, 2)
        .jpeg({
          quality: 50,
          chromaSubsampling: '4:4:4',
          progressive: true,
        })
        .toBuffer();
    } catch (err) {
      e(err.message);
      image.error = err.message;
      media.errors[image.id] = err.message;
    }

    delete image.buffer;
  }
};
