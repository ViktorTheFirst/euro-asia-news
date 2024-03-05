import type {} from '@mui/lab/themeAugmentation';
import { colors, createTheme } from '@mui/material';

const myTheme = createTheme({
  appBarHeight: 7,
  palette: {
    secondary: {
      main: colors.orange[500],
    },
  },
  breakpoints: {
    values: {
      xs: 400, // phone
      sm: 640, // tablets
      md: 940, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          caretColor: 'transparent',
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    appBarHeight?: number;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    appBarHeight?: number;
  }
}

export default myTheme;
