import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';

oceanBeachTheme.overrideStyles = options => ({
  a: {
    boxShadow: 'none',
    textDecoration: 'underline',
  },
});

const typography = new Typography(oceanBeachTheme);

export default typography;
