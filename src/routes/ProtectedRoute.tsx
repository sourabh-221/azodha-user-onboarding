import { useAppSelector } from '@/redux/redux-hooks';
import { ROUTES } from '@/shared/constants/app.constants';
import { Navigate, Outlet } from 'react-router';

/**
 * Blocks unauthenticated users — redirects them to /login.
 * If authenticated but onboarding is complete, passes through.
 * If authenticated but onboarding is incomplete, passes through
 * (the OnboardingGuard handles /home protection separately).
 */
export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
