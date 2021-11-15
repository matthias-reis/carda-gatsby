const baseUrl = 'https://storage.googleapis.com/cardamonchai-media/';
const previewImage = '640.webp';

export class Imagine {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  get previewUrl() {
    return `${baseUrl}${this.id}/${previewImage}`;
  }
  
  get name() {
    return this.id.split('/')[1].split('-imagine-')[0];
  }
}
