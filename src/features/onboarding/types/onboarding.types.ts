export type OnboardingStep = 1 | 2 | 3 | 4;

export interface PersonalProfile {
  name: string;
  age: number;
  email: string;
  /** base64-encoded image string, or null when not provided */
  profilePicture: string | null;
}

export interface FavoriteSong {
  id: string;
  title: string;
  artist: string;
}

export interface PaymentInfo {
  cardHolderName: string;
  /** Stored as raw digits (no spaces) — formatted for display only */
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface OnboardingState {
  currentStep: OnboardingStep;
  isCompleted: boolean;
  personalProfile: PersonalProfile | null;
  favoriteSongs: FavoriteSong[];
  paymentInfo: PaymentInfo | null;
}
