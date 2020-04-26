const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  data.content = data.content
    // no one needs spans
    .replace(/<(u|o)l[^>]*>(.*?)<\/(u|o)l>/gms, (_, listType, itemsString) => {
      const prefix = listType === 'o' ? '1.' : '- ';
      let [first, ...items] = itemsString.split('<li>');
      items = items.map((item) => {
        item = item.replace('</li>', '').replace(/\n/g, ' ').trim();
        return `${prefix} ${item}`;
      });

      return `
${items.join('\n')}
`;
    });

  return data;
};
