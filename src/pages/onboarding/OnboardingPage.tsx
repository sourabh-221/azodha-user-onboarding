import {
  FavoriteSongsStep,
  OnboardingLayout,
  PaymentInfoStep,
  PersonalProfileStep,
  SuccessStep,
} from '@/features/onboarding/components';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';

const STEP_COMPONENTS = {
  1: PersonalProfileStep,
  2: FavoriteSongsStep,
  3: PaymentInfoStep,
  4: SuccessStep,
} as const;

const OnboardingPage: React.FC = () => {
  const { currentStep } = useOnboarding();
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <OnboardingLayout>
      <StepComponent />
    </OnboardingLayout>
  );
};

export default OnboardingPage;
