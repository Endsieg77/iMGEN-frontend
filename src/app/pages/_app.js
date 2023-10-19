import { AppProps } from 'next/app'
import { useEffect } from 'react';
// import '../global.css';
 
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
