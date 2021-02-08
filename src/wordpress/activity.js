const { green, yellow, red, bold } = require('chalk');

module.exports = (activityName, cb, bail = false) => async (...props) => {
  const l = (...args) =>
    console.log(green('[INF]'), bold(activityName), ...args);
  const e = (...args) => console.log(red('[ERR]'), bold(activityName), ...args);
  const t0 = Date.now();
  const res = await cb(l, e, ...props);
  if (bail) {
    l(
      `${green(activityName)} FINISHED after ${yellow(
        (Date.now() - t0) / 1000
      )} s`
    );
  }
  return res;
};
