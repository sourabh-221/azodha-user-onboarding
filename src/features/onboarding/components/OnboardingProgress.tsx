import { ONBOARDING_STEPS } from '@/shared/constants/app.constants';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

import type { OnboardingStep } from '../types/onboarding.types';

interface OnboardingProgressProps {
  currentStep: OnboardingStep;
  className?: string;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  className,
}) => {
  return (
    <nav aria-label='Onboarding steps' className={className}>
      <ol className='space-y-1'>
        {ONBOARDING_STEPS.map(({ step, title, description }) => {
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <li key={step} className='flex items-start gap-3 py-2'>
              {/* Step indicator circle */}
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  isCompleted &&
                    'border-primary bg-primary text-primary-foreground',
                  isActive && 'border-primary bg-background text-primary',
                  !isCompleted &&
                    !isActive &&
                    'border-border bg-background text-muted-foreground',
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? <Check className='h-4 w-4' /> : step}
              </div>

              {/* Step labels */}
              <div className='min-w-0 pt-0.5'>
                <p
                  className={cn(
                    'text-sm leading-tight font-medium',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                    isCompleted && 'text-foreground',
                  )}
                >
                  {title}
                </p>
                <p className='mt-0.5 text-xs text-muted-foreground'>
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
