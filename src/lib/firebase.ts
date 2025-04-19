// ✅ src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { User, Question } from '@/types/user';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user;
      const now = new Date().toISOString();

      const userData: User = {
        uid: user.uid,
        email: user.email || '',
        isPro: false,
        quizProgress: {},
        createdAt: now,
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      return userCredential;
    }
  );
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const getUserData = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as User) : null;
};

export const updateUserIsPro = async (uid: string, isPro: boolean) => {
  const userRef = doc(db, 'users', uid);
  return updateDoc(userRef, {
    isPro,
  });
};

// ✅ UPDATED: Store best and last attempt
export const updateQuizProgress = async (
  uid: string,
  topic: string,
  score: number,
  total: number
) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const user = userSnap.data() as User;
  const existing = user.quizProgress?.[topic] || {};

  const updatedProgress = {
    bestScore: Math.max(existing.bestScore || 0, score),
    lastCorrect: score,
    lastTotal: total,
  };

  const newProgress = {
    ...user.quizProgress,
    [topic]: updatedProgress,
  };

  await updateDoc(userRef, {
    quizProgress: newProgress,
  });
};

export const getQuizQuestions = async (
  topic: string,
  questionCount: number = 10
): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, 'questions', topic, 'items');
    const querySnapshot = await getDocs(questionsRef);

    const questions = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        topic,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
      } as Question;
    });

    const shuffled = questions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, questionCount);
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    return [];
  }
};

export { auth, db };
