// src/types/user.ts

export type User = {
  uid: string;
  email: string;
  isPro: boolean;
  trialActive?: boolean;           // ✅ Indicates if trial is currently active
  trialStartedAt?: string;         // ✅ Timestamp when the trial started
  stripeCustomerId?: string;       // ✅ Stripe customer ID for managing subscriptions
  quizProgress: {
    [topic: string]: number;
  };
  createdAt: string;
};

export type Question = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};
