"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommend = void 0;
const recommend = (article, labels) => {
    var _a, _b;
    const recommendations = {};
    const articleLang = ((_a = article.frontmatter) === null || _a === void 0 ? void 0 : _a.language) || 'de';
    for (const label of article.fields.labels || []) {
        const articlesWithSameLabel = (((_b = labels[label.slug]) === null || _b === void 0 ? void 0 : _b.articles) || []).filter((a) => {
            var _a;
            const otherLang = ((_a = a.frontmatter) === null || _a === void 0 ? void 0 : _a.language) || 'de';
            return (a.frontmatter.title !== article.frontmatter.title &&
                articleLang === otherLang);
        });
        for (const a of articlesWithSameLabel) {
            if (!recommendations[a.fields.path]) {
                recommendations[a.fields.path] = {
                    article: a,
                    articleId: a.id,
                    vote: 1,
                };
            }
            else {
                recommendations[a.fields.path].vote++;
            }
        }
    }
    const ret = Object.values(recommendations).map((a) => {
        const timePenalty = (new Date(article.frontmatter.date).getTime() -
            new Date(a.article.frontmatter.date).getTime()) /
            (1000 * 60 * 60 * 24 * 365);
        const agePenalty = (Date.now() - new Date(a.article.frontmatter.date).getTime()) /
            (1000 * 60 * 60 * 24 * 365 * 3); // less weight (3 years = 1 label)
        a.vote = a.vote - timePenalty - agePenalty;
        return a;
    });
    return ret
        .sort((a, b) => b.vote - a.vote)
        .slice(0, 5)
        .map((a) => {
        delete a.article;
        return a;
    });
};
exports.recommend = recommend;
