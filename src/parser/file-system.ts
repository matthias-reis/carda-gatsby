import { readFileSync, writeFileSync } from 'fs';
import fm from 'front-matter';
import YAML from 'yaml';
import { sync as glob } from 'glob';
import prettier from 'prettier';

export class Markdown {
  private path: string;
  private rawContent: string = '';
  public attributes: Attributes = {};
  public body: string = '';
  public error: Error | null = null;
  private isDirty: boolean = false;

  constructor(path: string) {
    this.path = path;

    // reading the file
    try {
      this.rawContent = readFileSync(this.path, 'utf8');

      const content = fm(this.rawContent);
      this.attributes = content.attributes as Attributes;
      this.body = content.body;
    } catch (e) {
      this.error = e;
    }
  }

  markDirty() {
    this.isDirty = true;
  }

  changeContent(fn: (content: string, md: Markdown) => string) {
    const res = fn(this.body, this);
    if (res !== this.body) {
      this.markDirty();
      this.body = res;
    }
  }

  write() {
    if (this.isDirty) {
      let output = '---\n';
      output += YAML.stringify(this.attributes);
      output += '---\n\n';
      output += this.body;

      prettier.format(output, {
        printWidth: 80,
        parser: 'markdown',
        proseWrap: 'preserve',
      });

      writeFileSync(this.path, output, 'utf8');
    }
  }
}

export function getAllArticles() {
  const allArticles = glob(
    process.cwd() + '/content/+(articles|wordpress)/**/*.md'
  );
  return allArticles;
}

type Attributes = Record<string, string | string[] | Record<string, string>>;
