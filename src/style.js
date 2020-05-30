export const space = ['0.25rem', '0.5rem', '1rem', '2rem', '5rem', '8rem'];
export const width = ['5rem', '8rem', '13rem', '21rem', '34rem', '55rem'];
const factor = 1.18;
export const fontSize = [
  '0.52rem',
  '0.62rem',
  '0.85rem',
  '1rem', // text
  `${factor ** 1}rem`, // h4
  `${factor ** 2}rem`, //h3
  `${factor ** 3}rem`, //h2
  `${factor ** 4}rem`, //h1
  `${factor ** 5}rem`,
  `${factor ** 6}rem`, //title
];

export const color = {
  neutral: ['#111111', '#444444', '#666666', '#999999', '#CCCCCC', '#EEEEEE'],
  warm: ['#FE4365', '#FC9D9A', '#F9CDAD'],
  cold: ['#477761', '#83AF9B', '#a2bfb2', '#c9ded5', '#C8C8A9'],
  border: ['#AAAAAA', '#CCCCCC'],
};

export const fontStack = {
  title: ['Josefin sans', 'cursive'],
  heading: ['Raleway', 'sans-serif'],
  body: ['Raleway', 'sans-serif'],
};

export const font = {
  title: `"${fontStack.title.join('", "')}"`,
  heading: `"${fontStack.heading.join('", "')}"`,
  body: `"${fontStack.body.join('", "')}"`,
};

export const line = {
  dense: 1.2,
  standard: 1.5,
};
