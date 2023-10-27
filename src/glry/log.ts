import chalk from 'chalk';

const t0 = Date.now();

export const log = (line: any, isErr = false) =>
  console.log(
    chalk.grey(`[${((Date.now() - t0) / 1000).toFixed(3)} s] `),
    isErr ? chalk.red('[err] ') : chalk.green('[inf] '),
    line
  );

export const err = (line: any) => log(line, true);
