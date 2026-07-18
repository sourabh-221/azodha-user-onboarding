import {
  Badge,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useOnboarding } from '../../hooks/useOnboarding';
import {
  type PaymentInfoFormValues,
  paymentInfoSchema,
} from '../../schemas/paymentInfoSchema';

// ─── Input formatters ────────────────────────────────────

/** Formats raw digits → "1234 5678 9012 3456" for display */
function formatCardDisplay(raw: string): string {
  return raw.replace(/(.{4})/g, '$1 ').trim();
}

/** Strips non-digit characters from a card number input */
function parseCardInput(formatted: string): string {
  return formatted.replace(/\D/g, '').slice(0, 16);
}

/** Auto-inserts slash after MM in expiry input */
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

// ─── Component ───────────────────────────────────────────

export const PaymentInfoStep: React.FC = () => {
  const { paymentInfo, savePaymentInfo, goBack } = useOnboarding();
  const [cvvMasked, setCvvMasked] = useState(true);
  const cvvInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PaymentInfoFormValues>({
    resolver: zodResolver(paymentInfoSchema),
    defaultValues: {
      cardHolderName: paymentInfo?.cardHolderName ?? '',
      cardNumber: paymentInfo?.cardNumber ?? '',
      expiryDate: paymentInfo?.expiryDate ?? '',
      cvv: paymentInfo?.cvv ?? '',
    },
  });

  const onSubmit = (values: PaymentInfoFormValues) => {
    savePaymentInfo(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Payment Information
        </h2>
        <p className='mt-1 text-muted-foreground'>Add your card details</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className='space-y-5'
          noValidate
        >
          {/* Card Holder Name */}
          <FormField
            control={form.control}
            name='cardHolderName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Holder Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Sourabh Kumar'
                    autoComplete='cc-name'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Card Number */}
          <FormField
            control={form.control}
            name='cardNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <CreditCard className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      value={formatCardDisplay(field.value)}
                      onChange={(e) => {
                        const raw = parseCardInput(e.target.value);
                        field.onChange(raw);
                      }}
                      onBlur={field.onBlur}
                      placeholder='1234 5678 9012 3456'
                      className='pl-9 font-mono tracking-widest'
                      autoComplete='cc-number'
                      inputMode='numeric'
                      maxLength={19} // 16 digits + 3 spaces
                    />
                  </div>
                </FormControl>
                <FormDescription className='flex items-center gap-1'>
                  <Badge variant='secondary' className='text-xs'>
                    Test: 4242 4242 4242 4242
                  </Badge>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiry + CVV row */}
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='expiryDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(formatExpiry(e.target.value));
                      }}
                      onBlur={field.onBlur}
                      placeholder='MM/YY'
                      autoComplete='cc-exp'
                      inputMode='numeric'
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cvv'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      ref={cvvInputRef}
                      type={cvvMasked ? 'password' : 'text'}
                      placeholder='***'
                      autoComplete='cc-csc'
                      inputMode='numeric'
                      maxLength={4}
                      onFocus={() => {
                        setCvvMasked(false);
                      }}
                      onBlur={() => {
                        setCvvMasked(true);
                        field.onBlur();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Navigation */}
          <div className='flex justify-between pt-2'>
            <Button type='button' variant='outline' onClick={goBack}>
              Back
            </Button>
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
