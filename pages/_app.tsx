import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { ThemeProvider } from '@material-ui/core';
import { muiTheme } from '@/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
