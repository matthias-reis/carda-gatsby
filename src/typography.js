import Typography from 'typography';
import { fontStack } from './style';

const cardaTheme = {
  baseFontSize: '18px',
  baseLineHeight: 1.5,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Josefin Sans',
      styles: ['300'],
    },
    {
      name: 'Raleway',
      styles: ['300', '700'],
    },
  ],
  bodyFontFamily: fontStack.body,
  headerFontFamily: fontStack.heading,
  bodyGray: 40,
  bodyWeight: '300',
  headerWeight: '700',
};

const typography = new Typography(cardaTheme);

export default typography;
