'use client'

import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Document() {
    return (
        <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}