export const log = (
  space: string,
  text: string,
  severity: 'info' | 'warn' | Error = 'info'
) => {
  if (typeof severity === 'string') {
    console.info(
      `%c[${space}]`,
      severity === 'warn' ? 'color: orange' : 'color: green',
      text
    );
  } else {
    console.error(text, severity);
  }
};
