import { useAppSelector } from '@/redux/redux-hooks';
import { ROUTES } from '@/shared/constants/app.constants';
import { Navigate, Outlet } from 'react-router';

/**
 * Used on /onboarding — redirects users who have already completed onboarding
 * to /home so they cannot re-enter the flow.
 */
export const OnboardingGuard: React.FC = () => {
  const isCompleted = useAppSelector((s) => s.onboarding.isCompleted);

  if (isCompleted) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

/**
 * Used on /home — redirects users who have NOT completed onboarding back to
 * /onboarding so they finish their setup first.
 */
export const CompletionGuard: React.FC = () => {
  const isCompleted = useAppSelector((s) => s.onboarding.isCompleted);

  if (!isCompleted) {
    return <Navigate to={ROUTES.ONBOARDING} replace />;
  }

  return <Outlet />;
};
