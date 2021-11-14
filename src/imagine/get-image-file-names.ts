import { lstatSync as stat } from 'fs';
import { sync as glob } from 'glob';
import { parse, ParsedPath } from 'path';
import { yellow, redBright } from 'chalk';

export const getImageFileNames = (dir: string): ParsedImage[] => {
  let files: string[] = [];

  if (stat(dir).isDirectory()) {
    //folder
    files = glob(`${dir}/*.*`);
  } else {
    // single file
    files = [dir];
  }

  const parsedFiles = files.map((file) => ({ ...parse(file), file }));

  const images = parsedFiles.filter(isImage);

  if (images.length === 0) {
    console.log(redBright(`No image files found. Stopping here!`));
  } else {
    console.log(
      `Found ${yellow(images.length)} image/s. Processing starts now ...`
    );
  }

  return images;
};

export type ParsedImage = ParsedPath & { file: string };

function isImage(f: ParsedImage) {
  const ext = f.ext.substr(1);
  const images = ['jpeg', 'jpg', 'gif', 'png'];
  return images.indexOf(ext) > -1;
}
