"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeries = void 0;
const to_compact_article_1 = require("../to-compact-article");
const getSeries = (article, labels) => {
    var _a, _b;
    const seriesLabels = (_b = (_a = article.fields.labels) === null || _a === void 0 ? void 0 : _a.filter((label) => label.type === 'serie')) !== null && _b !== void 0 ? _b : [];
    const series = seriesLabels.reduce((ret, seriesLabel) => {
        ret[seriesLabel.title] = labels[seriesLabel.slug].articles
            .map(to_compact_article_1.toCompactArticle)
            .filter((article) => article.language !== 'en');
        return ret;
    }, {});
    return series;
};
exports.getSeries = getSeries;
