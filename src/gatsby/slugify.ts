export const slugify = (s: string) =>
  s
    .toString()
    .toLowerCase()
    .replace(/&/g, " und ")
    .replace(/è/g, "e")
    .replace(/'/g, "")
    .replace(/é/g, "e")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ø/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/ /g, "-");

export const getPath = (label: string) => {
  if (label.match(/[0-9]{4}\/[0-9]{2}/)) {
    return `/tag/${label}`;
  } else {
    return `/tag/${slugify(label)}`;
  }
};
