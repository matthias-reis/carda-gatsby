import { parse } from 'path';
import { Markdown, getAllArticles } from './file-system';
import { getFiles } from '../imagine/storage';
import { red } from 'chalk';
import { Imagine } from '../components/imagine';
import fetch from 'node-fetch';

async function run() {
  console.log('running <imagine>');

  const remoteImagePaths = await fetch(
    'https://storage.googleapis.com/cardamonchai-media/imagine-index.json'
  ).then((res) => res.json());

  let allArticles = getAllArticles();

  // allArticles = allArticles.slice(70, 80);

  for (const path of allArticles) {
    console.log(path);
    const md = new Markdown(path);
    replaceFrontmatterImage('image', md, remoteImagePaths);
    replaceFrontmatterImage('ogImage', md, remoteImagePaths);
    md.changeContent(replaceContentImages(remoteImagePaths));
    md.write();
  }
}

function replaceFrontmatterImage(
  key: string,
  md: Markdown,
  remoteImagePaths: string[]
) {
  const imagePath = md.attributes[key] as string | null;
  if (imagePath && !imagePath.startsWith('http')) {
    const slug = transformImagePath(imagePath);
    const entry = remoteImagePaths.find((i) => i.indexOf(slug) > -1);
    if (entry) {
      const image = new Imagine(decodeURIComponent(entry));
      md.attributes[key] = image.previewUrl;
      md.markDirty();
    } else {
      const error = `Imagine image not found: ${md.attributes[key]}`;
      if (!md.attributes.errors) {
        md.attributes.errors = {};
      }
      (md.attributes.errors as Record<string, string>)[key] = error;
      console.log(red(error), `@ ${md.attributes.title}`);
    }
  }
}

const replaceContentImages = (remoteImagePaths: string[]) =>
  function innerReplaceContentImages(content: string, md: Markdown): string {
    // TODO: replace all images
    content = content.replace(
      /]\((\/img\/.+\.(jpg|png|jpeg|gif))/g,
      (captured, imageName) => {
        const slug = transformImagePath(imageName as string);
        const entry = remoteImagePaths.find((i) => i.indexOf(slug) > -1);
        console.log('---');
        console.log(slug);
        console.log(entry);
        if (entry) {
          const image = new Imagine(decodeURIComponent(entry));
          console.log(image);
          return captured.replace(imageName, image.previewUrl);
        } else {
          const error = `Imagine image not found: <imageName>}`;
          if (!md.attributes.errors) {
            md.attributes.errors = {};
          }
          (md.attributes.errors as Record<string, string>).imagineContent =
            error;
          console.log(red(error), `@ ${md.attributes.title}`);
          return captured;
        }
      }
    );
    return content;
  };

function transformImagePath(image: string): string {
  if (!image) {
    return image;
  }

  const imageName = slugify(parse(image).name);

  return imageName;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

run();
