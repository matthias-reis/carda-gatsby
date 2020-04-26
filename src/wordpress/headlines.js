module.exports = async (l, e, data) => {
  data.content = data.content
    // first h2 is already a subtitle. this can only appear in false
    // markup
    .replace(
      /<h2[^>]*>(.+?)<\/h2>/gms,
      (_, match) => `
## ${match}
`
    )
    // h3 is also mapped to h2 - following accordingly
    .replace(
      /<h3[^>]*>(.+?)<\/h3>/gms,
      (_, match) => `
## ${match}
`
    )
    .replace(
      /<h4[^>]*>(.+?)<\/h4>/gms,
      (_, match) => `
### ${match}
`
    )
    .replace(
      /<h5[^>]*>(.+?)<\/h5>/gms,
      (_, match) => `
#### ${match}
`
    )
    .replace(
      /<h6[^>]*>(.+?)<\/h6>/gms,
      (_, match) => `
##### ${match}
`
    )
    // also replacing manual paragraph tags
    .replace(
      /<p[^>]*>(.+?)<\/p>/gms,
      (_, match) => `
${match}
`
    );
  return data;
};
