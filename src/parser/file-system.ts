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
      let output = `---
${YAML.stringify(this.attributes)}
---

${this.body}`;

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
