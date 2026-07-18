// ─────────────────────────────────────────────────────────
// Auth credentials (front-end only — no backend integration)
// ─────────────────────────────────────────────────────────
export const AUTH_CREDENTIALS = {
  username: 'user123',
  password: 'password123',
} as const;

// ─────────────────────────────────────────────────────────
// localStorage keys
// ─────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  AUTH: 'uob:auth',
  ONBOARDING: 'uob:onboarding',
} as const;

// ─────────────────────────────────────────────────────────
// Onboarding step definitions
// ─────────────────────────────────────────────────────────
export const ONBOARDING_STEPS = [
  {
    step: 1 as const,
    title: 'Personal Profile',
    description: 'Tell us a bit about yourself',
  },
  {
    step: 2 as const,
    title: 'Favourite Songs',
    description: 'Add songs you love listening to',
  },
  {
    step: 3 as const,
    title: 'Payment Information',
    description: 'Add your card details',
  },
  {
    step: 4 as const,
    title: 'All Done!',
    description: 'Your onboarding is complete',
  },
] as const;

export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;

// ─────────────────────────────────────────────────────────
// Profile picture constraints
// ─────────────────────────────────────────────────────────
export const PROFILE_PICTURE_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const PROFILE_PICTURE_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

// ─────────────────────────────────────────────────────────
// Route paths
// ─────────────────────────────────────────────────────────
export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  HOME: '/home',
  NOT_FOUND: '*',
} as const;
