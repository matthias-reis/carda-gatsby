import { defineConfig as e } from "tinacms";
const i = e({
  branch: "master",
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static"
    }
  },
  schema: {
    collections: [
      {
        label: "Neue Artikel",
        name: "neue_artikel",
        path: "content/articles",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: !0
          }
        ]
      },
      {
        label: "Alte Artikel (von WP)",
        name: "alte_artikel__von_wp_",
        path: "content/wordpress/articles",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: !0
          }
        ]
      },
      {
        label: "Statische Seiten",
        name: "statische_seiten",
        path: "content/pages",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: !0
          }
        ]
      }
    ]
  }
});
export {
  i as default
};
