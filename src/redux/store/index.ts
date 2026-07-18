import type { AuthState } from '@/features/auth/types/auth.types';
import type { OnboardingState } from '@/features/onboarding/types/onboarding.types';
import { STORAGE_KEYS } from '@/shared/constants/app.constants';
import { sessionStore, storage } from '@/utils/localStorage';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootReducer } from '../rootReducer';
import { baseAPI } from '../services/baseApi';

// ─── Rehydrate slices from storage ────────────────────────
// Auth: sessionStorage (cleared on browser close)
// Onboarding: localStorage (persists across sessions)
const preloadedState = {
  auth: (sessionStore.get(STORAGE_KEYS.AUTH) as AuthState | null) ?? undefined,
  onboarding:
    (storage.get(STORAGE_KEYS.ONBOARDING) as OnboardingState | null) ??
    undefined,
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseAPI.middleware),
});

// ─── Persist slices on every state change ────────────────────
// Auth → sessionStorage (session-only, security)
// Onboarding → localStorage (persists across sessions, per requirement)
store.subscribe(() => {
  const state = store.getState();
  sessionStore.set(STORAGE_KEYS.AUTH, state.auth);
  storage.set(STORAGE_KEYS.ONBOARDING, state.onboarding);
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
