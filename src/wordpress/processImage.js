const sharp = require('sharp');

module.exports = async (l, e, { buffer, ...image }) => {
  const original = sharp(buffer);
  const base64Buffer = await original
    .resize(64, 64, { fit: 'inside' })
    .sharpen()
    .toBuffer();
  const smallBuffer = await original
    .withMetadata()
    .resize({ width: 600 })
    .sharpen(2.5, 0.5, 2)
    .jpeg({
      quality: 40,
      chromaSubsampling: '4:4:4',
      progressive: true,
    })
    .toBuffer();
  const mediumBuffer = await original
    .withMetadata()
    .resize({ width: 800 })
    .sharpen(2, 0.5, 2)
    .jpeg({
      quality: 60,
      chromaSubsampling: '4:4:4',
      progressive: true,
    })
    .toBuffer();
  const largeBuffer = await original
    .withMetadata()
    .resize({ width: 1960 })
    .sharpen(2, 0.5, 2)
    .jpeg({
      quality: 50,
      chromaSubsampling: '4:4:4',
      progressive: true,
    })
    .toBuffer();

  return {
    ...image,
    base64Buffer,
    smallBuffer,
    mediumBuffer,
    largeBuffer,
  };
};
