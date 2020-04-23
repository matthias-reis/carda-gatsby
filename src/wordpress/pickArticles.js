module.exports = async (l, e, content) => {
  const channel = content.rss.channel[0];
  return channel.item; // that's items in fact
};
