import { Button } from '@/components';
import { ROUTES } from '@/shared/constants/app.constants';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useOnboarding } from '../../hooks/useOnboarding';

export const SuccessStep: React.FC = () => {
  const { personalProfile, finish, goBack } = useOnboarding();
  const navigate = useNavigate();

  const handleGoHome = () => {
    finish();
    void navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <div className='flex flex-col items-center py-8 text-center'>
      {/* Success icon */}
      <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary'>
        <CheckCircle2 className='h-10 w-10 text-primary-foreground' />
      </div>

      <h2 className='text-3xl font-bold tracking-tight'>You're all set!</h2>
      <p className='mt-3 max-w-sm text-muted-foreground'>
        {personalProfile?.name
          ? `Welcome, ${personalProfile.name}! Your`
          : 'Your'}{' '}
        onboarding is complete. Head to your dashboard to explore everything.
      </p>

      {/* Summary cards */}
      <div className='mt-8 grid w-full max-w-sm gap-3 text-left'>
        <div className='rounded-lg border border-border bg-secondary/40 px-4 py-3'>
          <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
            Profile
          </p>
          <p className='mt-1 font-medium'>{personalProfile?.name ?? '—'}</p>
          <p className='text-sm text-muted-foreground'>
            {personalProfile?.email ?? ''}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className='flex w-full max-w-sm gap-3 pt-2'>
        <Button
          type='button'
          variant='outline'
          className='flex-1'
          onClick={goBack}
        >
          Back
        </Button>
        <Button className='flex-1' onClick={handleGoHome}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
