import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AccountPage() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCancel = async () => {
    if (!user?.uid) return;

    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/cancel-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: user.uid }),
    });

    const data = await res.json();

    if (data.success) {
      await updateDoc(doc(db, "users", user.uid), {
        isPro: false,
        stripeSubscriptionId: null,
      });

      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Account Settings</h1>

      <div className="bg-white shadow-md rounded-lg p-6 text-center border">
        <p className="mb-3">
          <span className="font-semibold">Email:</span>{" "}
          {user?.email || "Not logged in"}
        </p>

        <p className="mb-5">
          <span className="font-semibold">Status:</span>{" "}
          {userData?.isPro ? (
            <span className="text-green-600 font-medium">
              ✅ Pro User
            </span>
          ) : (
            <span className="text-gray-500">Free User</span>
          )}
        </p>

        {userData?.isPro && userData?.stripeSubscriptionId && !success && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition"
          >
            {loading ? "Cancelling..." : "Cancel Subscription"}
          </button>
        )}

        {success && (
          <p className="text-green-600 mt-4 font-medium">
            ✅ Subscription cancelled
          </p>
        )}
      </div>
    </div>
  );
}
