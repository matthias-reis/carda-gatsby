"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCompactArticle = void 0;
const fixSoftHyphens = (s) => (s || '').replace(/&shy;/g, String.fromCharCode(173));
const toCompactArticle = ({ frontmatter, fields, }) => {
    return {
        title: fixSoftHyphens(frontmatter.title),
        typeName: frontmatter.typeName || frontmatter.type || 'Beitrag',
        subTitle: fixSoftHyphens(frontmatter.subTitle),
        description: frontmatter.description,
        excerpt: fixSoftHyphens(frontmatter.excerpt || ''),
        image: frontmatter.image,
        remoteLoadingImage: frontmatter.remoteLoadingImage,
        remoteThumbnailImage: frontmatter.remoteThumbnailImage,
        path: fields.path,
        date: frontmatter.date,
        language: frontmatter.language || 'de',
        languageLink: frontmatter.languageLink,
        advertisement: frontmatter.advertisement,
        affiliate: frontmatter.affiliate,
    };
};
exports.toCompactArticle = toCompactArticle;
