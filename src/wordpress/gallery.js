const { bold } = require('chalk');
const { images } = require('../../content/wordpress/media/images.json');
const R = require('ramda');

module.exports = async (l, e, line) => {
  // old gallery types
  let output;
  const oldGalleryRegex = /\[gallery.*ids="(.*)"\]/;
  const oldGalleryResult = oldGalleryRegex.exec(line);
  if (oldGalleryResult) {
    const ids = oldGalleryResult[1].split(',');
    const galleryImages = ids
      .map((id) => images[id])
      .filter(Boolean)
      .map(R.pick(['mediumUrl', 'largeUrl']));
    output = `<Gallery images={${JSON.stringify(galleryImages)}} />`;
  }

  const newGalleryRegex = /\[(glry|myflickr) .*"(.*)"\]/;
  const newGalleryResult = newGalleryRegex.exec(line);
  if (newGalleryResult) {
    const prefix = newGalleryResult[1] === 'myflickr' ? 'flickr/' : 'glry';
    const name = newGalleryResult[2];
    output = `<Gallery name="${prefix}${name}" />`;
  }

  return line.replace(
    /\[(gallery|glry|myflickr).*\]/,
    `

${output}

`
  );
};
