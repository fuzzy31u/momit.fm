import {default as NextHead} from 'next/head';
import Script from "next/script";
import { siteDescription } from '../const';

function initGA() {  
    return {__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', 'G-PXK0BSCDXQ');
        gtag('config', 'UA-219601984-1');  
    `}
  }
    
export default function Head() {
    return (
        <NextHead>
            <title>momit.fm</title>
            <meta name="description" content={siteDescription} />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/apple-touch-icon.png" sizes="180x180"></link>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"></link>
            <link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512"></link>
            <meta name="og:image" content="./sq-momitfm-gray.png"></meta>
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-PXK0BSCDXQ" />
            <script dangerouslySetInnerHTML={initGA()} />
      </NextHead>
    )
}
