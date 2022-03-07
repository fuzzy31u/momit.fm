import { default as NextHead } from 'next/head';
import Script from "next/script";
import { siteDescription } from '../const';

function initGA() {
    return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', 'G-PXK0BSCDXQ');
        gtag('config', 'UA-219601984-1');  
    `}
}

export default function Head({ title, description }) {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/apple-touch-icon.png" sizes="180x180"></link>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"></link>
            <link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512"></link>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo400/18189097/18189097-1643073624489-d9fed6b7c887c.jpg"></meta>
            <meta name="twitter:card" content="summary"></meta>
            <meta name="twitter:site" content="@_yukamiya"></meta>
            <meta name="twitter:creator" content="@_yukamiya"></meta>
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-PXK0BSCDXQ" />
            <script dangerouslySetInnerHTML={initGA()} />
        </NextHead>
    )
}
