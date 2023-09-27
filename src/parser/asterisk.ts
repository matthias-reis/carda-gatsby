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
  console.log('running <asterisk replacement>');

  const files = getAllArticles();

  const markdowns = files.map((file) => new Markdown(file));

  console.log(`<asterisk replacement> ${files.length} analysed articles`);
  // replace asterisks in title, subTitle, seoTitle, description, excerpt
  markdowns.forEach((md) => {
    md.changeAttribute('title', replace);
    md.changeRawContent((content) => {
      let [_e, yaml, ...text] = content.split('---\n');
      yaml = yaml.replace('⋆', '*');
      const textString = text.join('---\n').replace('⋆', '\\*');
      return ['', yaml, textString].join('---\n');
    });
  });

  const dirtyMarkdowns = markdowns.filter((md) => md.isChanged());
  dirtyMarkdowns.forEach((md) => md.writeRaw());
  console.log(
    `<asterisk replacement> ${dirtyMarkdowns.length} analysed articles`
  );

  // let's grep all md files

  // for (const file of files) {
  //   const rawContent = await readFile(file, 'utf-8');
  //   const content = fm<{ date: string; slug: string }>(rawContent);
  //   const { date, slug } = content.attributes;
  //   const d = dayjs(date);
  //   const month = `00${d.month() + 1}`.slice(-2);
  //   const year = d.year();
  //   // const url = `https://cardamonchai.com/${year}/${month}/${slug}`;

  //   const newPath = join(DEST_FOLDER, `/${year}/${month}/${slug}.md`);
  //   mkdirp(dirname(newPath));

  //   await rename(file, newPath);
  // }
}

run();
