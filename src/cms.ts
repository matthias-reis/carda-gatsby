import CMS from 'netlify-cms-app';

import ArticlePreview from './components/article-cms-controller';
import PagePreview from './components/page-cms-controller';

CMS.registerPreviewTemplate('article', ArticlePreview);
CMS.registerPreviewTemplate('post', PagePreview);
