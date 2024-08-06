import type {} from '@mui/lab/themeAugmentation';
import { colors, createTheme } from '@mui/material';

const myTheme = createTheme({
  appBarHeight: 10,
  backgroundColor: '#cfcfcf',
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#ff7030',
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
    backgroundColor?: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    appBarHeight?: number;
    backgroundColor?: string;
  }
}

export default myTheme;
