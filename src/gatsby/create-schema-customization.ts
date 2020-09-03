import { CreateSchemaCustomizationArgs } from "gatsby";

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Mdx implements Node {
      fields: MdxFields
    }
    type MdxFields {
      recommendations: [MdxFieldsRecommendations]
    }
    type MdxFieldsRecommendations {
      vote: Float
      article: MdxFieldsRecommendationsArticle
    }
    type MdxFieldsRecommendationsArticle {
      date: Date
      description: String  
      path: String  
      subTitle: String  
      title: String  
    }
  `;
  createTypes(typeDefs);
};
