import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { store } from '@/store';
import theme from '@/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>Euro-Asia News</title>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
