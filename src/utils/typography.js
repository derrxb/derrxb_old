import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

const defaultFontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

oceanBeachTheme.overrideStyles = options => ({
  a: {
    boxShadow: 'none',
    textDecoration: 'underline',
    fontFamily: 'inherit',
  },
  body: {
    fontFamily: defaultFontFamily,
  },
  h1: { fontFamily: 'inherit' },
  h2: { fontFamily: 'inherit' },
  h3: { fontFamily: 'inherit' },
  h4: { fontFamily: 'inherit' },
  h5: { fontFamily: 'inherit' },
  h6: { fontFamily: 'inherit' },
});

const typography = new Typography(oceanBeachTheme);

export default typography;
