import { useAppSelector } from '@/redux/redux-hooks';
import { ROUTES } from '@/shared/constants/app.constants';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { CompletionGuard, OnboardingGuard } from './OnboardingGuard';
import { ProtectedRoute } from './ProtectedRoute';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const OnboardingPage = lazy(() => import('@/pages/onboarding/OnboardingPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/error/not-found/NotFoundPage'));

/** Smart root redirect — sends the user to the correct page based on state. */
const RootRedirect: React.FC = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isCompleted = useAppSelector((s) => s.onboarding.isCompleted);

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!isCompleted) return <Navigate to={ROUTES.ONBOARDING} replace />;
  return <Navigate to={ROUTES.HOME} replace />;
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className='flex-center min-h-screen'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-border border-t-foreground' />
        </div>
      }
    >
      <Routes>
        {/* Root smart redirect */}
        <Route path={ROUTES.ROOT} element={<RootRedirect />} />

        {/* Public — login (redirects away if already authenticated) */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* /onboarding — blocked once onboarding is complete */}
          <Route element={<OnboardingGuard />}>
            <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
          </Route>

          {/* /home — only accessible after completing onboarding */}
          <Route element={<CompletionGuard />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
