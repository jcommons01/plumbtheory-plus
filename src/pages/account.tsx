import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider"; // Correct path to your Auth context
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Firestore client config

export default function AccountPage() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    if (!user?.uid) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();

      if (data.success) {
        // Optional: update Firestore client-side (if needed)
        await updateDoc(doc(db, "users", user.uid), {
          isPro: false,
          stripeSubscriptionId: null,
        });

        setMessage("✅ Subscription successfully cancelled.");
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <p>
            <strong>Email:</strong> {user?.email || "Not signed in"}
          </p>
          <p>
            <strong>Pro Access:</strong> {userData?.isPro ? "Yes" : "No"}
          </p>
        </div>

        {userData?.isPro && userData?.stripeSubscriptionId && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            {loading ? "Cancelling..." : "Cancel Subscription"}
          </button>
        )}

        {message && (
          <p className="text-sm mt-2 text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
