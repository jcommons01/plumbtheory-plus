import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">Last Updated: 2025-06-05</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of the App</h2>
      <p className="mb-4">
        By using PlumbTheory+, you agree to use the app only for educational purposes and in accordance with these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Subscriptions</h2>
      <p className="mb-4">
        Paid content requires a subscription via Stripe. You are responsible for managing your subscription, including cancellation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Account Responsibility</h2>
      <p className="mb-4">
        You must keep your login credentials secure. We may suspend accounts for misuse, fraud, or abuse.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        Content is for revision only. We do not guarantee exam results. Use the app at your own discretion.
      </p>
    </div>
  );
}
