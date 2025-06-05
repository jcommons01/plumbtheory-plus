import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: 2025-06-05</p>

      <p className="mb-4">
        PlumbTheory+ ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Email address (for login and support)</li>
        <li>Subscription/payment details via Stripe</li>
        <li>Quiz progress and usage data (stored via Firebase)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To provide login access and track progress</li>
        <li>To manage subscriptions and payments</li>
        <li>To improve features and content</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Firebase (authentication & storage)</li>
        <li>Stripe (payments)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You can request to view or delete your data by contacting <strong>plumbtheory@gmail.com</strong>.
      </p>
    </div>
  );
}
