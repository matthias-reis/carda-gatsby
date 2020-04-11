import CMS from 'netlify-cms-app';

import ArticlePreview from './components/article-preview';
import PagePreview from './components/page-preview';

CMS.registerPreviewTemplate('article', ArticlePreview);
CMS.registerPreviewTemplate('post', PagePreview);
