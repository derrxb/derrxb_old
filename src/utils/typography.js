import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-doelger';

oceanBeachTheme.overrideStyles = options => ({
  a: {
    boxShadow: 'none',
    textDecoration: 'underline',
    fontFamily: 'inherit',
  },
  h1: { fontFamily: 'Oswald' },
  h2: { fontFamily: 'Oswald' },
  h3: { fontFamily: 'Oswald' },
  h4: { fontFamily: 'Oswald' },
  h5: { fontFamily: 'Oswald' },
  h6: { fontFamily: 'Oswald' },
});

const typography = new Typography({
  ...oceanBeachTheme,
  googleFonts: [
    {
      name: 'Oswald',
      styles: ['300', '400', '500', '600', '700'],
    },
    {
      name: 'Source Sans Pro',
      styles: ['400', '400i', '700'],
    },
  ],
  headerFontFamily: ['Oswald', 'sans-serif'],
  bodyFontFamily: ['Source Sans Pro', 'serif'],
});

export default typography;
