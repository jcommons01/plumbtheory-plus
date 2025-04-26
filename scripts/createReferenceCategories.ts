// ✅ scripts/createReferenceCategories.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// Initialize Firebase App
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

// ✅ List of reference categories to create
const categories = [
  'fitting-types',
  'boiler-fault-codes',
  'water-regulations',
  'pipe-labelling',
  'conversion-tables',
];

async function createCategories() {
  try {
    for (const category of categories) {
      const categoryRef = doc(db, 'references', category);
      await setDoc(categoryRef, {}); // create an empty document
      console.log(`✅ Created empty category: ${category}`);
    }
    console.log('✅✅✅ All categories created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating categories:', error);
    process.exit(1);
  }
}

createCategories();
