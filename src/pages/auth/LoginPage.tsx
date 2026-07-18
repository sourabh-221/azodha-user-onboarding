import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAppSelector } from '@/redux/redux-hooks';
import { ROUTES } from '@/shared/constants/app.constants';
import { Navigate } from 'react-router';

const LoginPage: React.FC = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isCompleted = useAppSelector((s) => s.onboarding.isCompleted);

  // Already authenticated — redirect away
  if (isAuthenticated) {
    return (
      <Navigate to={isCompleted ? ROUTES.HOME : ROUTES.ONBOARDING} replace />
    );
  }

  return (
    <AuthLayout
      title='Welcome User'
      description='Sign in to continue your onboarding'
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
