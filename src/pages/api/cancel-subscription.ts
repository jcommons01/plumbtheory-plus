import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import admin from "firebase-admin";

// ✅ Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const adminDB = admin.firestore();

// ✅ Initialize Stripe (no apiVersion to avoid type errors)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "Missing UID" });
  }

  try {
    const userRef = adminDB.collection("users").doc(uid);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    if (!userData?.stripeSubscriptionId) {
      return res.status(400).json({ error: "No active subscription found." });
    }

    // ✅ Cancel subscription on Stripe
    await stripe.subscriptions.cancel(userData.stripeSubscriptionId);

    // ✅ Update Firestore user doc
    await userRef.update({
      isPro: false,
      stripeSubscriptionId: null,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("❌ Stripe cancel error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
