module.exports = async (l, e, line) => {
  return (
    line
      // first h2 is already a subtitle. this can only appear in false markup
      .replace(/<h2[^>]*>(.+?)<\/h2>/, (_, match) => `## ${match}`)
      // h3 is also mapped to h2 - following accordingly
      .replace(/<h3[^>]*>(.+?)<\/h3>/g, (_, match) => `## ${match}`)
      .replace(/<h4[^>]*>(.+?)<\/h4>/g, (_, match) => `### ${match}`)
      .replace(/<h5[^>]*>(.+?)<\/h5>/g, (_, match) => `#### ${match}`)
      .replace(/<h6[^>]*>(.+?)<\/h6>/g, (_, match) => `##### ${match}`)
      // also replacing manual paragraph tags
      .replace(/<p[^>]*>(.+?)<\/p>/g, (_, match) => match)
  );
};
