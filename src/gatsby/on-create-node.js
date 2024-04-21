"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreateNode = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const slugify_1 = require("./slugify");
const yaml_1 = __importDefault(require("yaml"));
const rawCategories = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, '../../content/config/categories.yml'), 'utf-8');
const categories = yaml_1.default.parse(rawCategories);
const onCreateNode = async ({ node, actions, getNode, }) => {
    var _a, _b, _c;
    const { createNodeField } = actions;
    if (node.internal.type === `Mdx`) {
        const indexedCategories = Object.fromEntries(categories.map(({ slug, parentId, title }) => {
            return [slug, { slug, title, parentId }];
        }));
        const parentCategories = Object.fromEntries(Object.values(indexedCategories).map(({ parentId, slug }) => {
            return [slug, indexedCategories[parentId || '']];
        }));
        // convert image paths for gatsby images
        const parent = getNode(node.parent);
        const type = parent.sourceInstanceName;
        const name = parent.name;
        const relativePath = parent.relativePath;
        let year;
        let month;
        let fileSlug;
        if (name.indexOf('---') > -1) {
            // format is 2020-01---name-with-dashes
            const [d, s] = name.split('---');
            [year, month] = d.split('-');
            fileSlug = s.replace('.md', '');
        }
        else {
            // format is 2020/01/name-with-dashes
            [year, month, fileSlug] = relativePath.split('/');
            fileSlug = fileSlug.replace('.md', '');
        }
        const slug = fileSlug;
        let path = '';
        if (type === 'article' || type === 'wordpress') {
            path = ((_a = node === null || node === void 0 ? void 0 : node.frontmatter) === null || _a === void 0 ? void 0 : _a.path) || `/${year}/${month}/${slug}/`;
            const labels = {};
            (((_b = node === null || node === void 0 ? void 0 : node.frontmatter) === null || _b === void 0 ? void 0 : _b.labels) || []).forEach((label) => {
                var _a;
                const slug = (0, slugify_1.slugify)(label);
                let [type, name] = label.split(':');
                if (!name) {
                    name = type;
                    type = 'tag';
                }
                if (indexedCategories[slug]) {
                    type = 'category';
                }
                const title = ((_a = indexedCategories[slug]) === null || _a === void 0 ? void 0 : _a.title) || name.trim();
                labels[slug] = {
                    title,
                    slug,
                    type,
                };
                if (parentCategories[slug]) {
                    const parent = parentCategories[slug];
                    labels[parent.slug] = {
                        title: parent.title,
                        slug: parent.slug,
                        type: 'category',
                    };
                }
            });
            labels[`${year}`] = {
                title: `${year}`,
                slug: `${year}`,
                type: 'archive',
            };
            labels[`${year}/${month}`] = {
                title: `${year}/${month}`,
                slug: `${year}/${month}`,
                type: 'archive',
            };
            createNodeField({
                node,
                name: `fileSlug`,
                value: fileSlug,
            });
            createNodeField({
                node,
                name: `labels`,
                value: Object.values(labels),
            });
            createNodeField({
                node,
                name: `year`,
                value: year,
            });
            createNodeField({
                node,
                name: `month`,
                value: month,
            });
        }
        else if (type === 'page') {
            path = ((_c = node === null || node === void 0 ? void 0 : node.frontmatter) === null || _c === void 0 ? void 0 : _c.path) || `/${slug}/`;
        }
        createNodeField({
            node,
            name: `type`,
            value: type,
        });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
        createNodeField({
            node,
            name: `path`,
            value: path,
        });
    }
};
exports.onCreateNode = onCreateNode;
