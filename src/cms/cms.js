import CMS from 'netlify-cms-app';
// import uploadcare from 'netlify-cms-media-library-uploadcare';
// import cloudinary from 'netlify-cms-media-library-cloudinary';

import ArticlePreview from './preview-templates/article-preview';
import PagePreview from './preview-templates/page-preview';

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('article', ArticlePreview);
CMS.registerPreviewTemplate('post', PagePreview);
