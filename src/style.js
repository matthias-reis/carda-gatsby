export const space = ['0.25rem', '0.5rem', '1rem', '2rem', '5rem', '8rem'];
export const width = ['5rem', '8rem', '13rem', '21rem', '34rem', '55rem'];

export const color = {
  neutral: ['#111111', '#777777', '#AAAAAA', '#CCCCCC', '#EEEEEE'],
  warm: ['#FE4365', '#FC9D9A', '#F9CDAD'],
  cold: ['#83AF9B', '#C8C8A9'],
  border: ['#AAAAAA', '#CCCCCC']
};

export const fontStack = {
  title: ['Josefin sans', 'cursive'],
  heading: ['Raleway', 'sans-serif'],
  body: ['Raleway', 'sans-serif']
};

export const font = {
  title: `"${fontStack.title.join('", "')}"`,
  heading: `"${fontStack.heading.join('", "')}"`,
  body: `"${fontStack.body.join('", "')}"`
};
