// src/types/user.ts

export type User = {
  uid: string;
  email: string;
  isPro: boolean;
  trialActive?: boolean;              // ✅ Previously used for free trial (can now be deprecated)
  trialStartedAt?: string;           // ✅ Timestamp of when trial started
  stripeCustomerId?: string;         // ✅ Optional: Stored Stripe customer ID
  stripeSubscriptionId?: string;     // ✅ Newly added: Stripe subscription ID for managing cancellations
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
