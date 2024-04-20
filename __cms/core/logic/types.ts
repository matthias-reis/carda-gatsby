export type Article = {
  title: string;
  slug: string;
  subTitle: string;
  seoTitle?: string;
  ogTitle?: string;
  date: string | Date;
  type: string;
  typeName: string;
  description: string;
  excerpt?: string;
  focusKeyword?: string;
  image?: string;
  imageCopyright?: string;
  remoteImage?: string;
  remoteLoadingImage?: string;
  remoteThumbnailImage?: string;
  ogImage?: string;
  language?: 'en' | 'de';
  languageLink?: string;
  advertisement?: boolean;
  affiliate?: boolean;
  productsProvided?: boolean;
  labels: string[];
  body: string;
  isDirty?: boolean;
};

export type MessageLevel = 'info' | 'warn' | 'error';

export type Message = {
  level: MessageLevel;
  time: number; // timestamp
  module: string;
  message: string;
};
