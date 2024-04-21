import { readFileSync, writeFileSync, rename } from 'node:fs';
import fm from 'front-matter';
import YAML from 'yaml';
import { sync as glob } from 'glob';
import prettier from 'prettier';

export class Markdown {
  private path: string;
  private newPath: string;
  private rawContent: string = '';
  public attributes: Attributes = {};
  public body: string = '';
  public error: Error | null = null;
  private isDirty: boolean = false;

  constructor(path: string) {
    this.path = path;
    this.newPath = path;

    // reading the file
    try {
      this.rawContent = readFileSync(this.path, 'utf8');

      const content = fm(this.rawContent);
      this.attributes = content.attributes as Attributes;
      this.body = content.body;

      const { date, slug } = this.attributes;
      if (slug && date) {
        const d = new Date(date);
        const month = `00${d.getMonth() + 1}`.slice(-2);
        const year = d.getFullYear();
        this.newPath = `${process.cwd()}/content/articles/${year}/${month}/${slug}.md`;
        if (this.path !== this.newPath) {
          this.markDirty();
        }
      }
    } catch (e) {
      this.error = e as Error;
    }
  }

  isChanged() {
    return this.isDirty;
  }

  markDirty() {
    this.isDirty = true;
  }

  changeAttribute(
    fieldName: string,
    fn: (fieldText: string, md: Markdown) => string
  ) {
    const res = fn(this.attributes?.[fieldName]?.toString() || '', this);
    if (res !== this.attributes[fieldName]) {
      this.markDirty();
      this.body = res;
    }
  }

  deleteAttribute(fieldName: string) {
    if (this.attributes[fieldName]) {
      delete this.attributes[fieldName];
      this.markDirty();
    }
  }

  changeContent(fn: (content: string, md: Markdown) => string) {
    const res = fn(this.body, this);
    if (res !== this.body) {
      this.markDirty();
      this.body = res;
    }
  }

  changeRawContent(fn: (content: string) => string) {
    const res = fn(this.rawContent);
    if (res !== this.rawContent) {
      this.markDirty();
      this.rawContent = res;
    }
  }

  writeRaw() {
    if (this.isDirty) {
      writeFileSync(this.path, this.rawContent, 'utf8');
    }
  }

  write() {
    if (this.isDirty) {
      // first move the file
      if (this.path !== this.newPath) {
        rename(this.path, this.newPath, (err) => {
          if (err) throw err;
          console.log('Rename complete!');
        });
      }

      let output = `---
${YAML.stringify(this.attributes)}
---

${this.body}`;

      prettier.format(output, {
        printWidth: 80,
        parser: 'markdown',
        proseWrap: 'preserve',
      });

      writeFileSync(this.newPath, output, 'utf8');
    }
  }
}

export function getAllArticles() {
  const allArticles = glob(
    process.cwd() + '/content/+(articles|wordpress)/**/*.md'
  );
  return allArticles;
}

type Attributes = {
  slug?: string;
  date?: string;
  [key: string]: string | string[] | undefined;
};
