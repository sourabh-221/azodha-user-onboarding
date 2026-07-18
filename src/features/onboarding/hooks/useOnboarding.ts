import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import {
  ONBOARDING_STEPS,
  TOTAL_ONBOARDING_STEPS,
} from '@/shared/constants/app.constants';

import {
  completeOnboarding,
  setFavoriteSongs,
  setPaymentInfo,
  setPersonalProfile,
  setStep,
} from '../store/onboardingSlice';
import type {
  FavoriteSong,
  OnboardingStep,
  PaymentInfo,
  PersonalProfile,
} from '../types/onboarding.types';

export const useOnboarding = () => {
  const dispatch = useAppDispatch();
  const {
    currentStep,
    isCompleted,
    personalProfile,
    favoriteSongs,
    paymentInfo,
  } = useAppSelector((s) => s.onboarding);

  const currentStepMeta = ONBOARDING_STEPS.find((s) => s.step === currentStep);
  const progressPercent = ((currentStep - 1) / TOTAL_ONBOARDING_STEPS) * 100;

  const goToStep = (step: OnboardingStep) => {
    dispatch(setStep(step));
  };

  const goBack = () => {
    if (currentStep > 1) {
      dispatch(setStep((currentStep - 1) as OnboardingStep));
    }
  };

  const savePersonalProfile = (data: PersonalProfile) => {
    dispatch(setPersonalProfile(data));
    dispatch(setStep(2));
  };

  const saveFavoriteSongs = (songs: FavoriteSong[]) => {
    dispatch(setFavoriteSongs(songs));
    dispatch(setStep(3));
  };

  const savePaymentInfo = (data: PaymentInfo) => {
    dispatch(setPaymentInfo(data));
    dispatch(setStep(4));
  };

  const finish = () => {
    dispatch(completeOnboarding());
  };

  return {
    currentStep,
    currentStepMeta,
    isCompleted,
    progressPercent,
    personalProfile,
    favoriteSongs,
    paymentInfo,
    goBack,
    goToStep,
    savePersonalProfile,
    saveFavoriteSongs,
    savePaymentInfo,
    finish,
    totalSteps: TOTAL_ONBOARDING_STEPS,
  };
};
