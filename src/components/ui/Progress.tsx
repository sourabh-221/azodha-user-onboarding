import { cn } from '@/utils/cn';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className='h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out'
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
