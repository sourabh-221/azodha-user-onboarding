import { cn } from '@/utils/cn';
import * as React from 'react';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className='flex-center min-h-screen bg-secondary/40 px-4'>
      <div className={cn('w-full max-w-md', className)}>
        {/* Brand mark */}
        <div className='mb-8 text-center'>
          <div className='mx-auto mb-4 flex-center h-12 w-12 rounded-xl bg-primary text-primary-foreground'>
            <span className='text-lg font-bold'>U</span>
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
          <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
        </div>

        {/* Card */}
        <div className='rounded-xl border border-border bg-card p-8 shadow-sm'>
          {children}
        </div>

        <p className='mt-6 text-center text-xs text-muted-foreground'>
          Demo credentials: <strong>user123</strong> /{' '}
          <strong>password123</strong>
        </p>
      </div>
    </div>
  );
};
