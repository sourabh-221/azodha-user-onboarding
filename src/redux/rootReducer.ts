import { authReducer } from '@/features/auth/store/authSlice';
import { onboardingReducer } from '@/features/onboarding/store/onboardingSlice';
import { combineReducers } from '@reduxjs/toolkit';

import { baseAPI } from './services/baseApi';

export const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  auth: authReducer,
  onboarding: onboardingReducer,
});

export type RootReducer = typeof rootReducer;
export default rootReducer;
