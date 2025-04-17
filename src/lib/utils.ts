export const isTrialActive = (trialStartedAt: string | undefined | null): boolean => {
    if (!trialStartedAt) return false;
  
    const trialStart = new Date(trialStartedAt).getTime();
    const now = Date.now();
    const diffInMs = now - trialStart;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    return diffInDays < 3;
  };
  