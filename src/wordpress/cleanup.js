module.exports = async (l, e, data) => {
  data.content = data.content.replace(/{" "}/gms, ' ');

  return data;
};
