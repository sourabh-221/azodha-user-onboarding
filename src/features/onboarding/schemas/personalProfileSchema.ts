import {
  PROFILE_PICTURE_ACCEPTED_TYPES,
  PROFILE_PICTURE_MAX_SIZE_BYTES,
} from '@/shared/constants/app.constants';
import { z } from 'zod';

export const personalProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  age: z
    .number({ error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age'),
  email: z.email('Please enter a valid email address'),
  profilePicture: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Optional
        // Validate it is a data URL with an accepted mime type
        const match = /^data:([^;]+);base64,/.exec(val);
        if (!match) return false;
        return PROFILE_PICTURE_ACCEPTED_TYPES.includes(match[1] ?? '');
      },
      { message: `Only JPEG, PNG, WebP, and GIF images are allowed` },
    )
    .refine(
      (val) => {
        if (!val) return true;
        // Rough byte estimate: base64 length × 0.75
        const base64 = val.split(',')[1] ?? '';
        const sizeBytes = (base64.length * 3) / 4;
        return sizeBytes <= PROFILE_PICTURE_MAX_SIZE_BYTES;
      },
      { message: 'Image must be smaller than 5 MB' },
    ),
});

export type PersonalProfileFormValues = z.infer<typeof personalProfileSchema>;
