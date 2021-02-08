module.exports = async (l, e, images) => {
  return images.map((image) => ({
    id: image['wp:post_id'][0],
    sourceUrl: image['wp:attachment_url'][0],
  }));
};
