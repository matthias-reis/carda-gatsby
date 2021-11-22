const baseUrl = 'https://storage.googleapis.com/cardamonchai-media/';
const previewImage = '640.webp';
const srcSetSizes = [240, 400, 640, 900, 1440];

export class Imagine {
  id: string;

  constructor(id: string) {
    console.log(id);
    if (id.startsWith('http')) {
      // it's an absolute url, so we have to strip it down to the id
      id = id.split('/').slice(-3, -1).join('/');
    }
    this.id = id;
  }

  get previewUrl() {
    return this.getUrl(previewImage);
  }

  get name() {
    return this.id.split('/')[1].split('-imagine-')[0];
  }

  getUrl(imageType: string) {
    return `${baseUrl}${this.id}/${imageType}`;
  }

  get meta() {
    const slice = this.id.split('-imagine-');
    if (!slice[1]) return { width: 0, height: 0, color1: '', color2: '' };
    const [color1, color2, width, height] = slice[1].split('_');
    return { color1, color2, width: parseInt(width), height: parseInt(height) };
  }

  get webpSrcSet() {
    return srcSetSizes
      .map((size) => `${this.getUrl(`${size}.webp`)} ${size}w`)
      .join(', ');
  }

  get jpegSrcSet() {
    return srcSetSizes
      .map((size) => `${this.getUrl(`${size}.jpg`)} ${size}w`)
      .join(', ');
  }
}
