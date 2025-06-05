// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1a] text-gray-300 py-6 text-center text-sm space-y-3">
      <div>
        © 2025 PlumbTheory+. All rights reserved.
      </div>

      <div className="space-x-4">
        <Link href="/legal/privacy" className="hover:underline">Privacy</Link>
        <Link href="/legal/terms" className="hover:underline">Terms</Link>
        <Link href="/legal/refund" className="hover:underline">Refunds</Link>
      </div>

      <p className="text-xs text-gray-400 px-4 max-w-2xl mx-auto">
        All content, including questions, images, and reference materials, is protected by copyright and may not be reproduced, distributed, or used without permission.
      </p>
    </footer>
  );
};

export default Footer;
