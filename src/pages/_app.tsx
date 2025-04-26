import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthProvider';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps & { router: any }) {
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

        {/* Rewardful Affiliate Tracking Script (Temporary) */}
        <script
          async
          src="https://r.wdfl.co/rw.js"
        ></script>
      </Head>

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
