import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  FavoriteSong,
  OnboardingState,
  OnboardingStep,
  PaymentInfo,
  PersonalProfile,
} from '../types/onboarding.types';

const initialState: OnboardingState = {
  currentStep: 1,
  isCompleted: false,
  personalProfile: null,
  favoriteSongs: [],
  paymentInfo: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<OnboardingStep>) {
      state.currentStep = action.payload;
    },
    setPersonalProfile(state, action: PayloadAction<PersonalProfile>) {
      state.personalProfile = action.payload;
    },
    setFavoriteSongs(state, action: PayloadAction<FavoriteSong[]>) {
      state.favoriteSongs = action.payload;
    },
    setPaymentInfo(state, action: PayloadAction<PaymentInfo>) {
      state.paymentInfo = action.payload;
    },
    completeOnboarding(state) {
      state.isCompleted = true;
      state.currentStep = 4;
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const {
  setStep,
  setPersonalProfile,
  setFavoriteSongs,
  setPaymentInfo,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export const onboardingReducer = onboardingSlice.reducer;
