exports.slugify = (s) =>
  s
    .toString()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ø/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');

exports.getPath = (label) => {
  if (label.match(/[0-9]{4}\/[0-9]{2}/)) {
    return label;
  } else {
    return exports.slugify(label);
  }
};
