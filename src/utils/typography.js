import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-doelger';

oceanBeachTheme.overrideStyles = options => ({
  a: {
    boxShadow: 'none',
    textDecoration: 'underline',
    fontFamily: 'inherit',
  },
  h1: { fontFamily: 'inherit' },
  h2: { fontFamily: 'inherit' },
  h3: { fontFamily: 'inherit' },
  h4: { fontFamily: 'inherit' },
  h5: { fontFamily: 'inherit' },
  h6: { fontFamily: 'inherit' },
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
