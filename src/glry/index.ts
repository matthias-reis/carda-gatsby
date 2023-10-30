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
  log(`using gallery name <${glryName}>`);
  log(`path <${folder}>`);
  try {
    mkdirSync(tmpFolder);
    log(`[glry publish] running ...`);
    log(`temp folder <${tmpFolder}>`);

    const files = glob.sync(`${folder}/*.j*g`);
    log(`<${files.length}> files detected`);

    if (files.length === 0) {
      err(`No files found. Stopping!`);
    } else {
      await transform(files, tmpFolder, glryName);
      log('finished transforming data');

      await upload(tmpFolder, glryName);
      log('finished uploading data');
    }
  } catch (e) {
    err(e);
  } finally {
    log('ending');
    rimraf.sync(tmpFolder);
  }
};

const [, , glryName, cwd] = process.argv;

run(glryName, cwd);
