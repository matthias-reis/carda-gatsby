import { join } from 'node:path';
import fm from 'front-matter';
import { sync as glob } from 'glob';
import { readFile, rename } from 'node:fs/promises';
import dayjs from 'dayjs';

const NEW_SOURCE_FOLDER = join(process.cwd(), 'content/articles');
const OLD_SOURCE_FOLDER = join(process.cwd(), 'content/wordpress/articles');
const DEST_FOLDER = join(process.cwd(), 'content/articles');

async function run() {
  console.log('running <reorg>');

  const oldFiles = glob(`${OLD_SOURCE_FOLDER}/*.md`);
  const newFiles = glob(`${NEW_SOURCE_FOLDER}/**/*.md`);
  const files = [...oldFiles, ...newFiles];

  // let's grep all md files
  console.log(`<reorg> ${oldFiles.length} old articles`);
  console.log(`<reorg> ${newFiles.length} new articles`);

  for (const file of files) {
    const rawContent = await readFile(file, 'utf-8');
    const content = fm<{ date: string; slug: string }>(rawContent);
    const { date, slug } = content.attributes;
    const d = dayjs(date);
    const month = `00${d.month() + 1}`.slice(-2);
    const year = d.year();
    const url = `https://cardamonchai.com/${year}/${month}/${slug}`;

    const newPath = join(DEST_FOLDER, `/${year}/${month}/${slug}`);
    await rename(file, newPath);
  }
}

run();
