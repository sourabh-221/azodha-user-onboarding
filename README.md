# User Onboarding Application

A React 19 + TypeScript multi-step onboarding flow with Redux state management and persistent session storage.

## Features

✅ **4-Step Onboarding Flow**

- Step 1: Personal Profile (name, age, email, profile picture)
- Step 2: Favorite Songs (dynamic list with add/remove)
- Step 3: Payment Information (card details with formatting)
- Step 4: Success & Summary

✅ **Authentication**

- Login with demo credentials (user123 / password123)
- Session-based auth using sessionStorage (clears on browser close)
- Secure credential handling

✅ **State Persistence**

- Redux + localStorage for onboarding state (persists across sessions)
- sessionStorage for auth state (session-only)
- Resume from last step even after browser close

✅ **User-Friendly Navigation**

- Back/Next buttons between steps
- Progress indicator with step tracking

## Tech Stack

- **React 19** - Latest UI library with improved DX
- **TypeScript 6** - Strict type safety
- **Redux Toolkit** - Centralized state management
- **Tailwind CSS v4** - Utility-first styling with B&W design tokens
- **React Hook Form + Zod** - Form validation
- **React Router v7** - Client-side routing
- **Vite 8** - Lightning-fast build tool

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Session Management

### Authentication Flow

- **Login**: Credentials validated against demo pair (user123/password123)
- **Session Storage**: Auth state stored in `sessionStorage` (clears on browser close)
- **Auto-Redirect**:
  - If authenticated + onboarding complete → redirects to `/home`
  - If authenticated + onboarding incomplete → redirects to `/onboarding`
  - If not authenticated → redirects to `/login`

### Onboarding Persistence

- Onboarding state stored in `localStorage` (persists across browser sessions)
- **Scenario A**: User completes onboarding → closes browser → returns next day
  - Must log in again (credentials cleared)
  - Onboarding data available → auto-redirects to `/home`

- **Scenario B**: User mid-onboarding → closes tab → reopens same session
  - Stays logged in (sessionStorage persists during session)
  - Resumes from same step

## Demo Credentials

```
Username: user123
Password: password123
```

## Key Behaviors

### Form Validation

- Each step has Zod validation schema
- Real-time error display
- Prevents progression with invalid data

### Back Navigation

- Users can return to previous steps from any onboarding step (including Step 4)
- Form data retained when navigating back

### Logout

- Clears only auth state (credentials)
- **Preserves** onboarding state for future sessions
- Returns user to login page

## Lint & Format

```bash
# ESLint + TypeScript
npm run lint

# Build (includes TypeScript compilation)
npm run build
```

## Design System

**Color Palette**: B&W (black & white)

- Primary: Black (#000000)
- Secondary: Light Gray (#F5F5F5)
- Accent: Dark Gray (#161616)

**Fonts**: Inter (Google Fonts)

**Spacing**: Tailwind default scale with custom radius tokens

---

**Version**: 1.0.0
**Last Updated**: July 2026
