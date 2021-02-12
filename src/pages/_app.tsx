/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import IsMobileProvider from '@/context/isMobileContext';
import GlobalStyle from '@/styles/global-styles';
import theme from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TITLE</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Global styles={GlobalStyle} />
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <IsMobileProvider>
            <Component {...pageProps} />
          </IsMobileProvider>
        </React.StrictMode>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
