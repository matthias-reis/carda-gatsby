const sharp = require(`sharp`);
const glob = require(`glob`);
const fs = require(`fs-extra`);
const matches = glob.sync(`static/img/**/*.{jpg,jpeg}`);
const MAX_WIDTH = 1440;
const QUALITY = 70;

Promise.all(
  matches.map(async (match) => {
    const stream = sharp(match);
    const info = await stream.metadata();
    if (info.width < MAX_WIDTH) {
      return;
    }
    const optimizedName = match.replace(
      /(\..+)$/,
      (match, ext) => `-optimized${ext}`
    );
    try {
      await stream
        .resize(MAX_WIDTH)
        .jpeg({ quality: QUALITY })
        .toFile(optimizedName);
    } catch (e) {
      console.error(`error compressing ${match}`, e);
    }
    return fs.rename(optimizedName, match);
  })
);
