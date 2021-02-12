module.exports = async (l, e, images, media) => {
  media.unprocessedImages = {};
  media.errors = {};

  for (const image of images) {
    const id = image['wp:post_id'][0];
    if (!media.images[id]) {
      media.images[id] = {
        id,
        sourceUrl: image['wp:attachment_url'][0],
        processed: false,
        error: null,
      };

      // all images that are not processed yet will be added to the
      // unprocessed list so we can add additional raw xml files
      media.unprocessedImages[id] = true;
    }
    if (!media.images[id].processed) {
      media.unprocessedImages[id] = true;
    }
  }
  return media;
};
