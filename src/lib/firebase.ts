// ✅ FILE: src/lib/firebase.ts
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
    seenIds: existing.seenIds || [],
    history: [
      ...(existing as any).history || [],
      {
        score,
        total,
        timestamp: new Date().toISOString(),
      },
    ],
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
  uid: string,
  topic: string,
  questionCount: number = 10
): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, 'questions', topic, 'items');
    const querySnapshot = await getDocs(questionsRef);

    const allQuestions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      topic,
      question: doc.data().question,
      options: doc.data().options,
      correctAnswer: doc.data().correctAnswer,
      explanation: doc.data().explanation,
    })) as Question[];

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? (userSnap.data() as User) : null;

    const seenQuestionIds = userData?.quizProgress?.[topic]?.seenIds || [];

    let seenIds = seenQuestionIds;
let unseenQuestions = allQuestions.filter(q => !seenIds.includes(q.id));

// ✅ If all questions have been seen, reset the seen list
if (unseenQuestions.length === 0) {
  seenIds = [];
  unseenQuestions = allQuestions;
}


    const questionsToUse = [];

    if (unseenQuestions.length >= questionCount) {
      questionsToUse.push(
        ...unseenQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount)
      );
    } else {
      const topUpCount = questionCount - unseenQuestions.length;
      const remaining = allQuestions.filter((q) => seenQuestionIds.includes(q.id));
      questionsToUse.push(...unseenQuestions);
      questionsToUse.push(
        ...remaining.sort(() => Math.random() - 0.5).slice(0, topUpCount)
      );
    }

    const updatedSeenIds = Array.from(
  new Set([...seenIds, ...questionsToUse.map((q) => q.id)])
);


    await updateDoc(userRef, {
      [`quizProgress.${topic}.seenIds`]: updatedSeenIds,
    });

    return questionsToUse;
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    return [];
  }
};

export { auth, db, app };
