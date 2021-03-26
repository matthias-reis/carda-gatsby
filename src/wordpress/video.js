module.exports = async (l, e, line) => {
  return line
    .replace(
      /<iframe.*[youtube|youtube-nocookie].com\/embed\/([^"]*)".*<\/iframe>/gms,
      (_, match) => ` <YouTube id="${match}" /> `
    )
    .replace(
      /\[youtube.*v=(.*)\]/gms,
      (_, match) => ` <YouTube id="${match}" /> `
    )
    .replace(
      /<iframe.*vimeo.com\/video\/([^"]*)".*<\/iframe>/gms,
      (_, match) => ` <YouTube id="${match}" /> `
    )
    .replace(
      /\[vimeo.*vimeo.com(.*) .*\]/gms,
      (_, match) => ` <Vimeo id="${match}" /> `
    );
};
