import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { customTheme } from '@/theme';
import { store } from '@/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>Teremok</title>
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
