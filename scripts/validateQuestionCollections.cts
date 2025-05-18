import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// ✅ Use relative import instead of @/
// DO THIS — no .js extension
import { topicMap } from '../src/utils/topicMap';



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

async function validateTopics() {
  console.log('🔍 Validating question collections...\n');

  for (const [slug, firestoreKey] of Object.entries(topicMap)) {
    const ref = collection(db, 'questions', firestoreKey, 'items');

    try {
      const snapshot = await getDocs(ref);
      const count = snapshot.size;

      if (count === 0) {
        console.warn(`⚠️  No questions found for: ${slug} → [${firestoreKey}]`);
      } else {
        console.log(`✅ ${slug} → ${count} question(s) found`);
      }
    } catch (err) {
      console.error(`❌ Error reading ${slug} → ${firestoreKey}`, err);
    }
  }

  console.log('\n✅ Validation complete.');
}

validateTopics();
