import { z } from 'zod';

export const paymentInfoSchema = z.object({
  cardHolderName: z
    .string()
    .min(2, 'Card holder name must be at least 2 characters')
    .max(100, 'Card holder name is too long'),
  /** Stored as raw 16 digits — UI formats with spaces */
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format')
    .refine((val) => {
      const [monthStr, yearStr] = val.split('/');
      if (!monthStr || !yearStr) return false;
      const month = parseInt(monthStr, 10);
      const year = 2000 + parseInt(yearStr, 10);
      const now = new Date();
      const expiry = new Date(year, month - 1, 1);
      return expiry >= new Date(now.getFullYear(), now.getMonth(), 1);
    }, 'Card has expired'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

export type PaymentInfoFormValues = z.infer<typeof paymentInfoSchema>;
