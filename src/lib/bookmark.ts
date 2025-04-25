import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';

export const toggleBookmark = async (uid: string, questionId: string, isBookmarked: boolean) => {
  const userRef = doc(db, 'users', uid);
  try {
    await updateDoc(userRef, {
      bookmarkedQuestions: isBookmarked ? arrayRemove(questionId) : arrayUnion(questionId),
    });
  } catch (err) {
    console.error('❌ Failed to update bookmarks:', err);
  }
};

export const getBookmarkedQuestions = async (uid: string): Promise<string[]> => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data().bookmarkedQuestions || [];
  }
  return [];
};
