import { Progress } from '@/components/ui/Progress';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/utils/cn';
import * as React from 'react';

import { useOnboarding } from '../hooks/useOnboarding';
import { OnboardingProgress } from './OnboardingProgress';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  className,
}) => {
  const { currentStep, progressPercent, currentStepMeta, totalSteps } =
    useOnboarding();

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Mobile top bar */}
      <div className='border-b border-border bg-card px-4 py-4 lg:hidden'>
        <div className='mx-auto max-w-lg'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm font-medium'>
              {currentStepMeta?.title}
            </span>
            <span className='text-xs text-muted-foreground'>
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progressPercent} aria-label='Onboarding progress' />
        </div>
      </div>

      {/* Desktop two-column layout */}
      <div className='mx-auto flex max-w-5xl gap-0 lg:min-h-screen'>
        {/* Left sidebar — sticky step navigator (desktop only) */}
        <aside className='hidden w-72 shrink-0 border-r border-border bg-card px-6 py-10 lg:flex lg:flex-col'>
          <div className='mb-8'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
              <span className='font-bold'>U</span>
            </div>
            <p className='mt-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
              Onboarding
            </p>
          </div>

          <OnboardingProgress currentStep={currentStep} />

          <Separator className='my-6' />

          <div className='mt-auto'>
            <p className='text-xs text-muted-foreground'>
              Step {currentStep} of {totalSteps}
            </p>
            <Progress
              value={progressPercent}
              className='mt-2'
              aria-label='Onboarding progress'
            />
          </div>
        </aside>

        {/* Main content area */}
        <main className='flex-1 px-4 py-8 lg:px-12 lg:py-12'>
          <div className='mx-auto max-w-lg'>{children}</div>
        </main>
      </div>
    </div>
  );
};
