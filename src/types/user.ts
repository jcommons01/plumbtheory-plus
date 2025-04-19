// src/types/user.ts

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
