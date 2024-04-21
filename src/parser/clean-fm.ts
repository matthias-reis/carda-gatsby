import { join } from 'node:path';
import { Markdown, getAllArticles } from './file-system';

async function run() {
  console.log('running <clean frontmatter>');

  const files = getAllArticles();

  const markdowns = files.map((file) => new Markdown(file));

  console.log(`<clean> ${files.length} analysed articles`);
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
