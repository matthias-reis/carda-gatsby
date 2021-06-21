export const space = ['0.25rem', '0.5rem', '1rem', '2rem', '5rem', '8rem'];
export const width = ['5rem', '8rem', '13rem', '21rem', '34rem', '55rem'];
const factor = 1.18;
export const fontSize = [
  '0.52rem',
  '0.62rem',
  '0.85rem',
  '1rem', // text
  `${factor ** 1}rem`, // h4
  `${factor ** 2}rem`, // h3
  `${factor ** 3}rem`, // h2
  `${factor ** 4}rem`, // h1
  `${factor ** 5}rem`,
  `${factor ** 6}rem`, // title
];

// $color-green: #5c9b72;
// $color-highlight: #96c6a7;
// $color-complementary: #a72078;

export const color = {
  /** page background */
  background10: '#121213',
  background20: '#1d1d1e',
  background30: '#242426',
  background40: '#303033',
  border10: '#ffffff08',
  border20: '#ffffff22',
  border30: '#ffffff44',
  green05: '#37483d',
  green10: '#496b55',
  green20: '#437D57',
  /** main signature green */
  green30: '#5C9B72',
  green40: '#96C6A7',
  green50: '#BAD6C4',
  highlight05: '#3c0629',
  highlight10: '#55093B',
  highlight20: '#7C1257',
  /** complementary signature pink */
  highlight30: '#A72078',
  highlight40: '#F6BAE3',
  highlight50: '#F0ECEE',
  overlay10: '#ffffff08',
  overlay15: '#ffffff18',
  overlay20: '#ffffff44',
  overlay30: '#ffffff88',
  overlay40: '#ffffffcc',
  shadow: '#000',
  /** highlighted text color */
  text10: '#fff',
  /** main text color */
  text20: '#ccc',
  /** secondary text color */
  text30: '#999',
  text40: '#666',
  text50: '#333',
};

export const fontStack = {
  title: ['Josefin sans', 'cursive'],
  // heading: ['Raleway', 'sans-serif'],
  // body: ['Raleway', 'sans-serif'],
  heading: ['Josefin sans', 'sans-serif'],
  body: ['Source Sans Pro', 'sans-serif'],
};

export const font = {
  title: `"${fontStack.title.join('", "')}"`,
  heading: `"${fontStack.heading.join('", "')}"`,
  body: `"${fontStack.body.join('", "')}"`,
};

export const line = {
  dense: 1.25,
  standard: 1.55,
};

export const breakpoints = {
  navFold: '900px',
  layoutFold: width[5],
  smallFold: width[4],
};
