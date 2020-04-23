module.exports = async (l, e, data) => {
  data.content = data.content
    // first h2 is already a subtitle. this can only appear in false
    // markup
    .replace(/<h2.*>(.+)<\/h2>/gm, (_, match) => `## ${match}`)
    // h3 is also mapped to h2 - following accordingly
    .replace(/<h3.*>(.+)<\/h3>/gm, (_, match) => `## ${match}`)
    .replace(/<h4.*>(.+)<\/h4>/gm, (_, match) => `### ${match}`)
    .replace(/<h5.*>(.+)<\/h5>/gm, (_, match) => `#### ${match}`)
    .replace(/<h6.*>(.+)<\/h6>/gm, (_, match) => `#### ${match}`);
  return data;
};
