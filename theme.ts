export interface CustomTheme {
  appBarHeight: number;
  spacing: number;
  palette: any;
  typography: any;
  shape: { borderRadius: number };
}
export const customTheme: CustomTheme = {
  palette: {
    primary: {
      main: '#2ea1f8',
      contrastText: '#ffffff',
      dark: '#1878ba',
      light: '#c2e1f9',
    },
    secondary: {
      main: '#FFF',
      dark: '#1878ba',
    },
    background: {
      default: '#26303c',
      paper: '#2a3744',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c2e1f9',
      disabled: '#7f8fa4',
    },
    success: {
      main: '#a5ffb9',
      dark: '#71ba81',
      light: '#dfffe6',
    },
    warning: {
      main: '#ffab2b',
      dark: '#726046',
    },
    error: {
      main: '#ff4d6a',
      dark: '#be4a5d',
      light: '#be4a5d',
    },
    divider: '#364556',
  },
  typography: {
    fontFamily: 'Rubik, sans-serif',
    fontWeightLight: 300,
    fontSize: 14,
    h1: {
      fontSize: 32,
      lineHeight: 3,
      fontWeight: 500,
    },
    h2: {
      fontSize: 24,
      lineHeight: 2.25,
      fontWeight: 500,
    },
    h3: {
      fontSize: 20,
      lineHeight: 2,
      fontWeight: 500,
    },
    h4: {
      fontSize: 16,
      lineHeight: 1.25,
      fontWeight: 500,
    },
    h5: {
      fontSize: 12,
      lineHeight: 1,
      fontWeight: 500,
    },
    h6: {
      fontSize: 10,
      lineHeight: 1,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 300,
      lineHeight: 2,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.25,
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.25,
    },

    caption: {
      color: '#c2e1f9',
    },
  },
  spacing: 8,
  appBarHeight: 7,
  shape: {
    borderRadius: 4,
  },
};
