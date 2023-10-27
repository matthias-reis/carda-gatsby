import glob from 'glob';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import rimraf from 'rimraf';

import { log, err } from './log';

import { transform } from './transform';
import { upload } from './upload';

const tmpFolder = resolve(tmpdir(), './glry');

const run = async (glryName: string, folder: string) => {
  try {
    mkdirSync(tmpFolder);
    log(`[glry publish] running ...`);
    log(`temp folder <${tmpFolder}>`);

    const files = glob.sync(`${folder}/*.jpg`);
    log(`<${files.length}> files detected`);

    await transform(files, tmpFolder, glryName);
    log('finished transforming data');

    await upload(tmpFolder, glryName);
    log('finished uploading data');
  } catch (e) {
    err(e);
  } finally {
    log('finally');
    rimraf.sync(tmpFolder);
  }
};

const [, , glryName] = process.argv;

run(glryName, process.cwd());
