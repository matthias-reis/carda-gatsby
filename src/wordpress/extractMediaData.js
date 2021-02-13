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
    }
  }
  return media;
};
