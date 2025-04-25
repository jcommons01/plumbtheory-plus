// ✅ FILE: src/types/user.ts

export type QuizAttempt = {
  score: number;
  total: number;
  timestamp: string;
};

export type User = {
  uid: string;
  email: string;
  isPro: boolean;
  createdAt: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  trialActive?: boolean;
  trialStartedAt?: string;
  quizProgress: {
    [topic: string]: {
      bestScore?: number;
      lastCorrect?: number;
      lastTotal?: number;
      seenIds?: string[];
      history?: QuizAttempt[];
    };
  };
};

export type Question = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};
