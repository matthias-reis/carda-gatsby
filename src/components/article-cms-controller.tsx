import React from "react";

import { ArticlePage } from "./article-page";
import { ErrorBoundary } from "./error-boundary";
import { processor } from "../markdown";

import { VFile } from "vfile";

const ArticleCmsController: React.FC<any> = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  if (data) {
    const { body, ...meta } = data;
    try {
      const processed = processor({}).processSync(body);
      return (
        <ErrorBoundary>
          <ArticlePage meta={meta}>
            <h1>test</h1>
            {processed.toString()}
          </ArticlePage>
        </ErrorBoundary>
      );
    } catch (e) {
      console.error(e);
      return <div>Error...</div>;
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default ArticleCmsController;
