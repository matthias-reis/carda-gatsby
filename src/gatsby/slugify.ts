export const slugify = (s: string) =>
  s
    .toString()
    .toLowerCase()
    .replace(/&/g, ' und ')
    .replace(/è/g, 'e')
    .replace(/'/g, '')
    .replace(/é/g, 'e')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ø/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');

export const getPath = (label: {
  type: string;
  title: string;
  slug: string;
}) => {
  if (label.type === 'archive') {
    // it's a date like 2019/04
    return `/${label.slug}`;
  } else {
    return `/tag/${label.slug}`;
  }
};
