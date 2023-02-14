"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPages = void 0;
const path_1 = require("path");
const slugify_1 = require("./slugify");
const is_production_1 = require("../is-production");
const recommend_1 = require("./recommend");
const get_series_1 = require("./get-series");
const fs_1 = require("fs");
const to_compact_article_1 = require("../to-compact-article");
const paginationBasePath = (0, path_1.join)(__dirname, '../../public/homepage-data');
const filter = is_production_1.isProduction
    ? `filter: {frontmatter: {date: {lte: "${new Date().toISOString()}"}}},`
    : '';
const ALL_PAGE_QUERY = `
query AllPageQuery {
  allMdx(
    ${filter}
    sort: { fields: frontmatter___date, order: DESC }
  ) {
    edges {
      node {
        id
        fields {
          path
          month
          year
          type
          labels {
            slug
            type
            title
          }
        }
        frontmatter {
          title
          subTitle
          date
          description
          type
          typeName
          remoteLoadingImage
          remoteThumbnailImage
          language
          languageLink
          advertisement
          affiliate
          image
        }
      }
    }
  }
}
`;
const createPages = async ({ actions, graphql, getNode, }) => {
    const { createPage } = actions;
    const { errors, data } = await graphql(ALL_PAGE_QUERY);
    if (errors) {
        errors.forEach((e) => console.error(e.toString()));
        throw new Error(`All page query ended with errors: ${errors.join(', ')}`);
    }
    const edges = data.allMdx.edges;
    const labels = {};
    for (const edge of edges) {
        const { fields } = edge.node;
        for (const { slug, title, type } of fields.labels || []) {
            if (!labels[slug]) {
                labels[slug] = { type, title, slug, articles: [] };
            }
            labels[slug].articles.push(edge.node);
        }
    }
    for (const label of Object.values(labels)) {
        const path = (0, slugify_1.getPath)(label);
        // ONE PAGE FOR EACH LABEL
        if (path && label.articles.length > 1) {
            const component = (0, path_1.resolve)(__dirname, '../components', `list-controller.tsx`);
            createPage({ path, component, context: { slug: label.slug, label } });
        }
    }
    for (const edge of edges) {
        const article = edge.node;
        const linkableLabels = article.fields.labels &&
            article.fields.labels.map((label) => ({
                ...label,
                count: labels[label.slug].articles.length,
            }));
        // fire the recommender engine`
        const recommendations = (0, recommend_1.recommend)(article, labels);
        const series = (0, get_series_1.getSeries)(article, labels);
        const singleArticlePageComponent = (0, path_1.resolve)(__dirname, '../components', `article-controller.tsx`);
        const singleStaticPageComponent = (0, path_1.resolve)(__dirname, '../components', `page-controller.tsx`);
        // ONE PAGE FOR EACH ARTICLE
        // create a gatsby page for each article / static page
        // including their recommendations
        createPage({
            path: edge.node.fields.path,
            component: edge.node.fields.type === 'page'
                ? singleStaticPageComponent
                : singleArticlePageComponent,
            context: {
                id: edge.node.id,
                recommendations: recommendations.map((r) => r.articleId),
                series: series,
                linkableLabels,
            },
        });
    }
    // HOME PAGE PAGINATION
    // creating the homepage pagination
    // 30 articles on each additional page
    // first filter static pages
    const articles = edges
        .map((edge) => edge.node)
        .filter((node) => node.fields.type !== 'page')
        .filter((node) => node.frontmatter.language !== 'en')
        // the first 23 articles are displayed already
        // 3 above the fold, 20 below the fold
        // the rest will be loaded in chunks of 50
        .slice(23)
        .map(to_compact_article_1.toCompactArticle);
    //package articles into 50
    const getSliced = (arr, n) => {
        if (arr.length) {
            return [arr.slice(0, n), ...getSliced(arr.slice(n), n)];
        }
        else {
            return [];
        }
    };
    const packs = getSliced(articles, 50);
    const allArticlesPageComponent = (0, path_1.resolve)(__dirname, '../components', `all-articles-controller.tsx`);
    packs.forEach((pack, i) => {
        // RAW PAGINATION DATA
        writePackToJson(pack, i + 1, packs.length);
        // PAGINATED FOLLOW UPS OF HOMEPAGE
        createPage({
            path: `/all-articles/${i + 2}`,
            component: allArticlesPageComponent,
            context: {
                pageNumber: i + 2,
                articles: pack,
                maxPageNumber: packs.length + 1,
            },
        });
    });
};
exports.createPages = createPages;
const writePackToJson = (articles, pageNumber, maxPages) => {
    if (!(0, fs_1.existsSync)(paginationBasePath)) {
        (0, fs_1.mkdirSync)(paginationBasePath);
    }
    const filePath = (0, path_1.join)(paginationBasePath, `homepage-pagination-${pageNumber}.json`);
    const dataToSave = JSON.stringify({ articles, pageNumber, maxPages }, null, 2);
    (0, fs_1.writeFileSync)(filePath, dataToSave);
};
