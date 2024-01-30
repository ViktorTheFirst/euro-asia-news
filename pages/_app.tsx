import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import { customTheme } from '@/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
