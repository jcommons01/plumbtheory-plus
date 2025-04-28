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
  <title>PlumbTheory+ | Plumb Theory | UK Plumbing Exam Preparation</title>
  <meta
    name="description"
    content="Prepare for your UK Level 3 plumbing exams with PlumbTheory+. Interactive quizzes, progress tracking, and full Plumb Theory exam revision."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />

  {/* Open Graph (OG) meta for Facebook/Reddit/LinkedIn */}
  <meta property="og:title" content="PlumbTheory+ | Plumb Theory | UK Plumbing Exam Preparation" />
  <meta property="og:description" content="Master your UK plumbing exams with PlumbTheory+. Plumb Theory quizzes, revision support, and progress tracking." />
  <meta property="og:image" content="https://yourdomain.com/your-og-image.png" /> {/* <-- I'll help you create this! */}
  <meta property="og:url" content="https://plumbtheory.co.uk/" />
  <meta property="og:type" content="website" />

  {/* Twitter Card meta */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="PlumbTheory+ | Plumb Theory | UK Plumbing Exam Preparation" />
  <meta name="twitter:description" content="Prepare for your Level 3 Plumbing exams with PlumbTheory+. Quiz-based revision and progress tracking for Plumb Theory topics." />
  <meta name="twitter:image" content="https://yourdomain.com/your-og-image.png" />
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
