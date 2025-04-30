import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthProvider';
import Head from 'next/head';
import Script from 'next/script';
import { AnimatePresence, motion } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps & { router: any }) {
  return (
    <>
      <Head>
        {/* Google Ads Global Site Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17021468689"></script>
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

      {/* ✅ Rewardful Affiliate Tracking */}
      <Script
        src="https://r.wdfl.co/rw.js"
        data-rewardful="dbf7c1"
        strategy="afterInteractive"
      />
      <Script id="rewardful-queue" strategy="beforeInteractive">
        {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
      </Script>

      <AuthProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
}
