/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyle from '@/styles/global-styles';
import theme from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TITLE</title>
      </Head>

      <Global styles={GlobalStyle} />
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
