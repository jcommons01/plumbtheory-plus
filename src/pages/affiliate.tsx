import Head from 'next/head';
import Layout from '@/components/Layout';

export default function AffiliatePage() {
  return (
    <Layout title="Affiliate Program | PlumbTheory+">
      <Head>
        <meta
          name="description"
          content="Join the PlumbTheory+ affiliate program and earn 20% recurring commission by referring plumbing students and professionals."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Join the PlumbTheory+ Affiliate Program</h1>
          <p className="text-lg text-gray-700 mb-8">
            Help plumbing students and professionals discover the UK’s best revision and training tool —
            and earn a <span className="text-blue-700 font-semibold">20% recurring commission</span> for every Pro subscriber you refer.
          </p>

          <div className="text-left text-gray-700 bg-white border border-blue-100 rounded-lg shadow p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Why promote PlumbTheory+?</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>💰 Earn 20% commission every month, for every paying user you refer</li>
              <li>📚 Trusted by UK plumbing students and professionals</li>
              <li>🚀 Easy to promote via YouTube, TikTok, blogs, or student groups</li>
              <li>🔗 Get your own custom referral link — track clicks and earnings</li>
              <li>✅ No technical setup required — just share and earn</li>
            </ul>
          </div>

          <a
            href="https://plumbtheory.co.uk/?via=install" // 🔁 Replace with your actual Rewardful signup link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition"
          >
            Become an Affiliate Now
          </a>

          <p className="text-sm text-gray-500 mt-6">
            Questions? <a href="mailto:plumbtheory@gmail.com" className="underline">Contact our team</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
