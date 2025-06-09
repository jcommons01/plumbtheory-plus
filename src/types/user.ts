export type QuizAttempt = {
  score: number;
  total: number;
  timestamp: string;
};

export type UserData = {
  uid: string;
  email: string;
  isPro: boolean;
  createdAt: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string | null; // ✅ allow null
  cancelAtPeriodEnd?: boolean;          // ✅ added
  subscriptionEndDate?: number | null;         // ✅ added
  trialActive?: boolean;
  trialStartedAt?: string;
  currentPeriodEnd?: number;

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
