import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { login } from '@/features/auth/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { AUTH_CREDENTIALS, ROUTES } from '@/shared/constants/app.constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { type LoginFormValues, loginSchema } from '../schemas/loginSchema';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCompleted = useAppSelector((s) => s.onboarding.isCompleted);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    const { username, password } = AUTH_CREDENTIALS;
    if (values.username.trim() !== username || values.password !== password) {
      toast.error('Invalid credentials', {
        description: 'Please check your username and password.',
      });
      return;
    }

    dispatch(login(values.username));
    toast.success(`Welcome ${values.username}`);

    void navigate(isCompleted ? ROUTES.HOME : ROUTES.ONBOARDING, {
      replace: true,
    });
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
        className='space-y-5'
        noValidate
      >
        {/* Username */}
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className='relative'>
                  <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    {...field}
                    placeholder='user123'
                    className='pl-9'
                    autoComplete='username'
                    autoFocus
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='pr-10 pl-9'
                    autoComplete='current-password'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      setShowPassword((v) => !v);
                    }}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting && <Loader2 className='animate-spin' />}
          Sign In
        </Button>
      </form>
    </Form>
  );
};
