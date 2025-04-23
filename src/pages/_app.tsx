import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthProvider';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Google Ads Global Site Tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17021468689"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17021468689');
            `,
          }}
        />
      </Head>

      {/* Rewardful Affiliate Tracking Script */}
      <Script
        src="https://r.wdfl.co/rw.js"
        data-rewardful="YOUR_REWARDFUL_PUBLIC_KEY"
        strategy="afterInteractive"
      />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
