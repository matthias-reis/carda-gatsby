import { dirname, join } from 'node:path';
import fm from 'front-matter';
import { sync as mkdirp } from 'mkdirp';
import { sync as glob } from 'glob';
import { readFile, rename } from 'node:fs/promises';
import dayjs from 'dayjs';
import { Markdown, getAllArticles } from './file-system';

const NEW_SOURCE_FOLDER = join(process.cwd(), 'content/articles');
const OLD_SOURCE_FOLDER = join(process.cwd(), 'content/wordpress/articles');
const DEST_FOLDER = join(process.cwd(), 'content/articles');

const replace = (old: string) => old.replace('⋆', '*');

async function run() {
  console.log('running <clean frontmatter>');

  const files = getAllArticles();

  const markdowns = files.map((file) => new Markdown(file));

  console.log(`<clean frontmatter> ${files.length} analysed articles`);
  // replace asterisks in title, subTitle, seoTitle, description, excerpt
  markdowns.forEach((md) => {
    md.deleteAttribute('slug');
    md.deleteAttribute('path');
    md.deleteAttribute('fileName');
    md.deleteAttribute('status');
    md.deleteAttribute('errors');
    md.write();
  });
}

run();
