import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      head: ['Josefin sans', 'sans-serif'],
      mono: ['Menlo', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: {
          10: '#121213',
          20: '#1d1d1e',
          30: '#242426',
          40: '#303033',
        },
        line: {
          10: '#ffffff08',
          20: '#ffffff22',
          30: '#ffffff44',
        },
        main: {
          5: '#37483d',
          10: '#496b55',
          20: '#437D57',
          30: '#5C9B72',
          signature: '#5C9B72',
          40: '#96C6A7',
          50: '#BAD6C4',
        },
        highlight: {
          5: '#3c0629',
          10: '#55093B',
          20: '#7C1257',
          30: '#A72078',
          signature: '#A72078',
          40: '#F6BAE3',
          50: '#F0ECEE',
        },
        overlay: {
          10: '#ffffff08',
          15: '#ffffff18',
          20: '#ffffff44',
          30: '#ffffff88',
          40: '#ffffffcc',
        },

        shadow: '#000',
        text: {
          10: '#fff',
          highlight: '#fff',
          20: '#ccc',
          main: '#ccc',
          30: '#999',
          dimmed: '#999',
          40: '#666',
          50: '#333',
        },
      },
    },
  },
  plugins: [],
};
export default config;
