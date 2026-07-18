import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import {
  PROFILE_PICTURE_ACCEPTED_TYPES,
  PROFILE_PICTURE_MAX_SIZE_BYTES,
} from '@/shared/constants/app.constants';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useOnboarding } from '../../hooks/useOnboarding';
import {
  type PersonalProfileFormValues,
  personalProfileSchema,
} from '../../schemas/personalProfileSchema';

export const PersonalProfileStep: React.FC = () => {
  const { personalProfile, savePersonalProfile } = useOnboarding();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PersonalProfileFormValues>({
    resolver: zodResolver(personalProfileSchema),
    defaultValues: {
      name: personalProfile?.name ?? '',
      age: personalProfile?.age ?? ('' as unknown as number),
      email: personalProfile?.email ?? '',
      profilePicture: personalProfile?.profilePicture ?? null,
    },
  });

  const profilePicture = useWatch({
    control: form.control,
    name: 'profilePicture',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!PROFILE_PICTURE_ACCEPTED_TYPES.includes(file.type)) {
      form.setError('profilePicture', {
        message: 'Only JPEG, PNG, WebP, and GIF images are allowed',
      });
      return;
    }

    if (file.size > PROFILE_PICTURE_MAX_SIZE_BYTES) {
      form.setError('profilePicture', {
        message: 'Image must be smaller than 5 MB',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      form.setValue('profilePicture', reader.result as string, {
        shouldValidate: true,
      });
      form.clearErrors('profilePicture');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (values: PersonalProfileFormValues) => {
    savePersonalProfile({
      name: values.name,
      age: values.age,
      email: values.email,
      profilePicture: values.profilePicture ?? null,
    });
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight'>Personal Profile</h2>
        <p className='mt-1 text-muted-foreground'>
          Tell us a bit about yourself to get started.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className='space-y-6'
          noValidate
        >
          {/* Profile Picture */}
          <FormField
            control={form.control}
            name='profilePicture'
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-4'>
                    {/* Avatar preview */}
                    <button
                      type='button'
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className={cn(
                        'relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-secondary transition-colors hover:border-primary hover:bg-secondary/70',
                        profilePicture && 'border-solid border-border',
                      )}
                      aria-label='Upload profile picture'
                    >
                      {profilePicture ? (
                        <img
                          src={profilePicture}
                          alt='Profile preview'
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <ImagePlus className='h-6 w-6 text-muted-foreground' />
                      )}
                    </button>

                    {/* Actions */}
                    <div className='flex flex-col gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      >
                        {profilePicture ? 'Change photo' : 'Upload photo'}
                      </Button>
                      {profilePicture && (
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='text-destructive hover:text-destructive'
                          onClick={() => {
                            form.setValue('profilePicture', null);
                            if (fileInputRef.current)
                              fileInputRef.current.value = '';
                          }}
                        >
                          <X className='mr-1 h-3 w-3' />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  JPEG, PNG, WebP or GIF — max 5 MB
                </FormDescription>
                <FormMessage />
                <input
                  ref={fileInputRef}
                  type='file'
                  accept={PROFILE_PICTURE_ACCEPTED_TYPES.join(',')}
                  className='hidden'
                  onChange={handleFileChange}
                  aria-hidden='true'
                />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Sourabh Kumar'
                    autoComplete='name'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age */}
          <FormField
            control={form.control}
            name='age'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={18}
                    max={120}
                    placeholder='25'
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === '' ? '' : parseInt(val, 10));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='someone@example.com'
                    autoComplete='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end pt-2'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting && <Loader2 className='animate-spin' />}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
