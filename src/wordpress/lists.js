const { bold } = require('chalk');

module.exports = async (l, e, line) => {
  return line.replace(
    /<(u|o)l[^>]*>(.*?)<\/(u|o)l>/gms,
    (_, listType, itemsString) => {
      const prefix = listType === 'o' ? '1. ' : '- ';
      let items = itemsString.split('</li>');
      items = items
        .map((item) => {
          item = item
            .replace(/<li[^>]*>/, '')
            .replace(/\n/g, ' ')
            .trim();
          return `${prefix} ${item}`;
        })
        .filter((item) => item.trim() !== prefix.trim());

      return `${items.join('\n')}`;
    }
  );
};
