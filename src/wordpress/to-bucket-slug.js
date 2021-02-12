// images look like
// http://cardamonchai.com/wp-content/uploads/2011/02/p8150059.jpg
// https://cardamonchai.com/wp-content/uploads/2011/02/p8150059.jpg

module.exports = (url) =>
  url
    .replace('http://', '')
    .replace('https://', '')
    .replace('cardamonchai.com/wp-content/uploads/', '')
    .replace(/\//g, '_')
    .replace('.jpg', '');
