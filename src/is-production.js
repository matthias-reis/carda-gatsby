"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPreview = exports.isProduction = void 0;
exports.isProduction = process.env.GATSBY_CARDA_PREVIEW !== 'true';
exports.isPreview = process.env.GATSBY_CARDA_PREVIEW === 'true';
