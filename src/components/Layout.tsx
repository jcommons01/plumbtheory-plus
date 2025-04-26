// ✅ src/components/Layout.tsx
import { FC, ReactNode } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: FC<LayoutProps> = ({
  children,
  title = 'PlumbTheory+ | UK Plumbing Exam Preparation',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Prepare for your UK Level 3 plumbing exams with topic-based quizzes and progress tracking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ✅ Rewardful Scripts */}
      <Script
        src="https://r.wdfl.co/rw.js"
        data-rewardful="dbf7c1"
        strategy="afterInteractive"
      />
      <Script id="rewardful-queue" strategy="beforeInteractive">
        {`
          (function(w,r){
            w._rwq=r;
            w[r]=w[r]||function(){
              (w[r].q=w[r].q||[]).push(arguments)
            }
          })(window,'rewardful');
        `}
      </Script>

      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
