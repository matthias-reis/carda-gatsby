const meta = require('../../content/wordpress/metadata/meta.json');

describe('Basic Functionality', () => {
  for (const path of meta.paths) {
    it(`can access ${path}`, () => {
      cy.visit(`https://cardamonchai.amreis.de${path}`);
    });
  }
});
