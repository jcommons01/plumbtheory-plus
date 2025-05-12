import Footer from './Footer';
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
        {/* Title and Meta */}
        <title>{title}</title>
        <meta name="description" content="Prepare for your UK Level 2 and Level 3 plumbing exams with PlumbTheory+. Interactive quizzes, real-life scenarios, progress tracking, and reference materials." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph (OG) Meta */}
        <meta property="og:title" content="PlumbTheory+ | UK Plumbing Exam Prep" />
        <meta property="og:description" content="Master your Level 2 and Level 3 UK plumbing exams with quizzes, revision support, and real-world references." />
        <meta property="og:image" content="https://plumbtheory.co.uk/og-image.png" />
        <meta property="og:url" content="https://plumbtheory.co.uk/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PlumbTheory+ | UK Plumbing Exam Prep" />
        <meta name="twitter:description" content="Revise smarter for UK plumbing exams with quizzes, scenarios, references, and progress tracking." />
        <meta name="twitter:image" content="https://plumbtheory.co.uk/og-image.png" />
      </Head>

      {/* Rewardful Scripts */}
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
      <Footer />
    </>
  );
};

export default Layout;
