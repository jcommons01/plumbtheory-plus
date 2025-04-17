// src/components/Layout.tsx
import { FC, ReactNode } from 'react';
import Head from 'next/head';
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
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
